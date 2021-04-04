const { MessageEmbed } = require("discord.js");
/* eslint-disable */

module.exports = {
  name: "search",
  run: async (message, args) => {
    const { channel } = message.member.voice;

    if (!channel) return message.reply("you need to join a voice channel.");
    if (!args.length)
      return message.reply("you need to give me a URL or a search term.");

    const player = message.client.manager.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
    });

    if (player.state !== "CONNECTED") player.connect();

    const search = args.join(" ");
    let res;

    try {
      res = await player.search(search, message.author);
      if (res.loadType === "LOAD_FAILED") {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (err) {
      return message.reply(
        `there was an error while searching: ${err.message}`
      );
    }
    const noResultsEmbed = new MessageEmbed()
      .setColor("RED")
      .setDescription("There Were No Results Found, Please Try again.");
    switch (res.loadType) {
      case "NO_MATCHES":
        if (!player.queue.current) player.destroy();
        return message.channel.send(noResultsEmbed);
      case "TRACK_LOADED":
        player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused && !player.queue.size)
          player.play();
        return message.reply(`enqueuing \`${res.tracks[0].title}\`.`);
      case "PLAYLIST_LOADED":
        player.queue.add(res.tracks);

        if (
          !player.playing &&
          !player.paused &&
          player.queue.totalSize === res.tracks.length
        )
          player.play();
        return message.reply(
          `enqueuing playlist \`${res.playlist.name}\` with ${res.tracks.length} tracks.`
        );
      case "SEARCH_RESULT":
        let max = 7,
          collected,
          filter = (m) =>
            m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
        if (res.tracks.length < max) max = res.tracks.length;

        const results = res.tracks
          .slice(0, max)
          .map((track, index) => `${++index} - [${track.title}](${track.uri})`)
          .join("\n");

        // message.channel.send(results);
        const resultsEmbed = new MessageEmbed()
          .setAuthor("Crypton Music")
          .setColor("#2DDBE2")
          .setDescription(results)
          .setFooter(`Req By. ${message.author.tag}`);
        message.channel.send(resultsEmbed);
        try {
          collected = await message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ["time"],
          });
        } catch (e) {
          if (!player.queue.current) player.destroy();
          const timeoutEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription("Selection Timeout");
          return message.channel.send(timeoutEmbed);
        }

        const first = collected.first().content;

        if (first.toLowerCase() === "end") {
          if (!player.queue.current) player.destroy();
          const cancellSelectionEmbed = new MessageEmbed()
            .setDescription("Cancelled selection.")
            .setColor("#2DDBE2");

          return message.channel.send(cancellSelectionEmbed);
        }

        const index = Number(first) - 1;
        if (index < 0 || index > max - 1)
          return message.reply(
            `the number you provided too small or too big (1-${max}).`
          );

        const track = res.tracks[index];
        player.queue.add(track);

        if (!player.playing && !player.paused && !player.queue.size)
          player.play();
      // return message.reply(`enqueuing \`${track.title}\`.`);
    }
  },
};
