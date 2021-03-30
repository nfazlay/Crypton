const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "play",
  description: "Plays the Entered Song In Vc you are connected to.",
  guildOnly: true,
  aliases: ["p"],
  run: async (message, args) => {
    const res = await message.client.manager.search(
      args.join(" "),
      message.author
    );

    const player = message.client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });
    if (player.playing && player.queue.current) {
      player.queue.add(res.tracks[0]);
      message.react("👌");
      const addedToQueueEmbed = new MessageEmbed()
        .setDescription(
          `Queued [${res.tracks[0].title}](${res.tracks[0].uri}) [<@${res.tracks[0].requester.id}>]`
        )
        .setColor("#2DDBE2");
      return message.channel.send(addedToQueueEmbed);
    }
    player.connect();
    // if (!player.playing && !player.paused && !player.queue.size) player.play();
    message.react("👌");
    player.play(res.tracks[0]);
    const playingEmbed = new MessageEmbed()
      .setAuthor("Crypton Music")
      .setColor("#00ffff")
      .setTitle(`${res.tracks[0].title}`)
      .setThumbnail(res.tracks[0].thumbnail)
      .setURL(res.tracks[0].uri)
      .setFooter(`Req. by ${message.author.tag}`)
      .addFields(
        {
          name: "Author:",
          value: res.tracks[0].author,
          inline: true,
        },
        {
          name: "Duration:",
          value: ms(res.tracks[0].duration),
          inline: true,
        }
      );
    message.channel.send(playingEmbed);

    //work in progress
    // if (!player.playing && !player.paused && !player.queue.size) player.play();
    // if (
    //   !player.playing &&
    //   !player.paused &&
    //   player.queue.totalSize === res.tracks.length
    // )
    //   player.play();
  },
};
