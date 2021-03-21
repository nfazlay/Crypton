module.exports = {
  name: "looptrack",
  description: "Loops The Current Playing Song",
  guildOnly: true,
  aliases: ["loopt", "lt"],
  run: async (message, args) => {
    if (!args.length) {
      return message.reply("Mention `yes` or `No` as Argument");
    }
    const player = message.client.manager.get(message.guild.id);
    if (!player) {
      return message.reply("🙄There is No Music Playing around you");
    }
    const { channel } = message.member.voice;

    if (!channel) {
      return message.reply("you need to join a vc to run this command!");
    }
    if (channel.id != player.voiceChannel) {
      return message.reply(
        "You are not in a channel where music is being played!"
      );
    }
    if (args[0] === "yes") {
      player.setTrackRepeat(true);
      return message.reply("Track Loop is Turned on");
    }
    if (args[0] === "no") {
      player.setTrackRepeat(false);
      return message.reply("Track Loop is Turned off");
    }
  },
};
