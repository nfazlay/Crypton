const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "search",
  run: (message) => {
    // const { channel } = message.member.voice;
    // if (!channel) {
    //   const notInVoiceChannelEmbed = new MessageEmbed()
    //     .setColor("RED")
    //     .setDescription();
    // }
    // const player = message.client.manager.get(message.guild.id);
    // if (!player) {
    //   const player = message.client.manager.create({
    //     guild: message.guild.id,
    //     voiceChannel: channel.id,
    //     textChannel: message.channel.id,
    //   });
    // }
    const LyricsEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        "Under Development | Raise Ticket [here](https://discord.gg/fRVtnW8kY8) for Faster Development"
      );

    message.channel.send(LyricsEmbed);
  },
};
