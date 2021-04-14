const { MessageEmbed } = require("discord.js");
const { ui } = require("../../json/defaults.json");

module.exports = {
  name: "looptrack",
  description: "Loops The Current Playing Song",
  guildOnly: true,
  aliases: ["loopt", "lt"],
  run: async (message, args) => {
    if (!args.length) {
      const NoArgsEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription("Mention `yes` or `No` as Argument");
      message.channel.send(NoArgsEmbed);
      return;
    }
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
    const { title, uri } = player.queue.current;
    if (args[0] === "yes") {
      player.setTrackRepeat(true);
      message.react("🔁");
      const StartedLoopingTrackEmbed = new MessageEmbed()
        .setColor(ui.musicEmbedsColor)
        .setDescription(`Looping The Track [${title}](${uri})`);
      return message.channel.send(StartedLoopingTrackEmbed);
    }
    if (args[0] === "no") {
      player.setTrackRepeat(false);
      const StoppedLoopingTrackEmbed = new MessageEmbed()
        .setColor(ui.musicEmbedsColor)
        .setDescription(`Stopped Looping The Track [${title}](${uri})`);
      return message.channel.send(StoppedLoopingTrackEmbed);
    }
  },
};
