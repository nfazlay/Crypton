const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "disconnect",
  description: "Disconnects the Bot from Voice Channel.",
  guildOnly: true,
  aliases: ["dc", "leave"],
  run: async (message) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) {
      return message.reply("There is No Music Playing around you!");
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

    await message.react("👋");
    const disconnectEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription("See you soon!");
    message.channel.send(disconnectEmbed);
    channel.leave();
    await player.disconnect();
  },
};
