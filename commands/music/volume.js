const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "volume",
  description: "Volume of Queue",
  guildOnly: true,
  aliases: ["v", "vol"],
  run: async (message, args) => {
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
    if (!args.length) {
      const CurrentVolumeEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`Queue Volume is **${player.volume}**`);
      message.channel.send(CurrentVolumeEmbed);
      return;
    }
    const volumeChecker = (volume) => {
      if (!volume || volume < 1 || volume > 100) {
        const EnterVolumeBW1And100Embed = new MessageEmbed()
          .setColor("RED")
          .setDescription("Please give a Volume between 1 and 100");
        return message.channel.send(EnterVolumeBW1And100Embed);
      }
    };
    const volSet = () => {
      const volumeSetToEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`Queue Volume Set to **${player.volume}**`);
      message.channel.send(volumeSetToEmbed);
    };
    if (args[0].startsWith("+")) {
      const volString = args[0].replace("+", "");
      volumeChecker(Number(volString));
      const vol = player.volume + Number(volString);
      if (!vol || vol < 1 || vol > 100) {
        const EnterVolumeBW1And100Embed = new MessageEmbed()
          .setColor("RED")
          .setDescription("Please give a Volume between 1 and 100");
        return message.channel.send(EnterVolumeBW1And100Embed);
      }
      player.setVolume(vol);
      return volSet();
    }
    if (args[0].startsWith("-")) {
      const volString = args[0].replace("-", "");
      volumeChecker(Number(volString));
      const vol = player.volume - Number(volString);
      if (!vol || vol < 1 || vol > 100) {
        const EnterVolumeBW1And100Embed = new MessageEmbed()
          .setColor("RED")
          .setDescription("Please give a Volume between 1 and 100");
        return message.channel.send(EnterVolumeBW1And100Embed);
      }
      player.setVolume(vol);
      return volSet();
    }

    const volume = Number(args[0]);
    if (!volume || volume < 1 || volume > 100) {
      const EnterVolumeBW1And100Embed = new MessageEmbed()
        .setColor("RED")
        .setDescription("Please give a Volume between 1 and 100");
      return message.channel.send(EnterVolumeBW1And100Embed);
    }
    await player.setVolume(volume);
    return volSet();
  },
};
