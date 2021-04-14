const { MessageEmbed } = require("discord.js");
const { ui } = require("../../json/defaults.json");

module.exports = {
  name: "resume",
  description: "Resumes the Paused Song",
  guildOnly: true,
  aliases: ["res"],
  run: async (message) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) {
      message.reply("There is no song playing!");
      return;
    }

    const { channel } = message.member.voice;
    if (!channel) {
      const NotInVoiceChannelEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription("You have to join Voice Channel to Run this Command");
      message.channel.send(NotInVoiceChannelEmbed);
      return;
    }
    if (channel.id !== player.voiceChannel) {
      const NotInSameVoiceChannelEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription("You are not in the same voice channel!");
      message.channel.send(NotInSameVoiceChannelEmbed);
      return;
    }
    if (!player.paused) {
      const NotPausedEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription("Music is Not Paused to Resume");
      message.channel.send(NotPausedEmbed);
      return;
    }
    await message.react("▶️");
    player.pause(false);
    const ResumedEmbed = new MessageEmbed()
      .setColor(ui.musicEmbedsColor)
      .setDescription("Music Has Been Resumed!");
    return message.channel.send(ResumedEmbed);
  },
};
