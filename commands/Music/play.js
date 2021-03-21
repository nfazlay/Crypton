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

    player.connect();
    if (player.playing && player.queue.current) {
      player.queue.add(res.tracks[0]);
      return message.reply(`Added \`${res.tracks[0].title}\` to Queue`);
    }
    // if (!player.playing && !player.paused && !player.queue.size) player.play();

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
