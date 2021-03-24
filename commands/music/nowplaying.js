const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "nowplaying",
  description: "Gives information of Current Playing Song",
  guildOnly: true,
  aliases: ["current", "np", "cp"],
  run: async (message) => {
    const player = message.client.manager.get(message.guild.id);
    const currentSong = player.queue.current;

    const playingEmbed = new MessageEmbed()
      .setAuthor("Crypton Music")
      .setColor("BLUE")
      .setTitle(`${currentSong.title}`)
      .setThumbnail(currentSong.thumbnail)
      .setURL(currentSong.uri)
      .setFooter(`Req. by ${currentSong.requester.tag}`)
      .addFields(
        {
          name: "Author:",
          value: currentSong.author,
          inline: true,
        },
        {
          name: "Duration:",
          value: ms(currentSong.duration),
          inline: true,
        }
      );
    message.channel.send(playingEmbed);
  },
};
