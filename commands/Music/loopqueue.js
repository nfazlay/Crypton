module.exports = {
  name: "loopqueue",
  description: "Loops The whole Queue",
  guildOnly: true,
  aliases: ["loopq", "loopque", "lq"],
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
      player.setQueueRepeat(true);
      return message.reply("Queue Loop is Turned on");
    }
    if (args[0] === "no") {
      player.setQueueRepeat(false);
      return message.reply("Queue Loop is Turned off");
    }
  },
};
