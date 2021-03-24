const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "clearqueue",
  description: "Clears Whole Queue",
  guildOnly: true,
  aliases: ["cq", "clearq", "clearque"],
  run: (message) => {
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
    if (!player.queue.current) {
      const NoCurrentSongEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription("There are No Songs to skip, Play some songs First.");
      message.channel.send(NoCurrentSongEmbed);
      return;
    }
    const { queue } = player;
    if (!queue.size) {
      const NoQueueEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription("The Queue is Empty, play some songs First.");
      return message.channel.send(NoQueueEmbed);
    }
    message.react("👌");
    const queueSize = queue.size;
    queue.clear();
    const clearedQueueEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(`Cleared ${queueSize} Songs From Queue.`);
    message.channel.send(clearedQueueEmbed);
  },
};
