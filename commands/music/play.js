const { MessageEmbed } = require("discord.js");
const { ui } = require("../../json/defaults.json");
/* eslint-disable */

module.exports = {
  name: "play",
  aliases: ["p", "ply"],
  guildOnly: true,
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
      .setDescription("There Were No Tracks Found, Please Try again.");
    switch (res.loadType) {
      case "NO_MATCHES":
        if (!player.queue.current) player.destroy();
        return message.channel.send(noResultsEmbed);
      case "TRACK_LOADED":
        player.queue.add(res.tracks[0]);
        if (player.queue.current) {
          const queuedEmbed = new MessageEmbed()
            .setColor(ui.musicEmbedsColor)
            .setDescription(
              `Queued [${res.tracks[0].title}](${res.tracks[0].uri}) [<@${res.tracks[0].requester.id}>]`
            );
          message.channel.send(queuedEmbed);
        }
        if (!player.playing && !player.paused && !player.queue.size)
          player.play();

      // return message.reply(`enqueuing \`${res.tracks[0].title}\`.`);
      case "PLAYLIST_LOADED":
        player.queue.add(res.tracks);
        if (player.queue.current) {
          const addedQueueEmbed = new MessageEmbed()
            .setColor(ui.musicEmbedsColor)
            .setDescription(
              `Queued ${res.tracks.length} Tracks from [${res.playlist.name}](${res.playlist.uri}) Plylist`
            );
          message.channel.send(addedQueueEmbed);
        }
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
        player.queue.add(res.tracks[0]);
        // console.log("search res");
        if (player.queue.current && player.playing) {
          const queueE = new MessageEmbed()
            .setColor(ui.musicEmbedsColor)
            .setDescription(
              `Queued [${res.tracks[0].title}](${res.tracks[0].uri}) [<@${res.tracks[0].requester.id}>]`
            );
          message.channel.send(queueE);
        }

        if (!player.playing && !player.paused && !player.queue.size)
          player.play();
    }
  },
};
