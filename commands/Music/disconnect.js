module.exports = {
  name: "disconnect",
  description: "Disconnects the Bot from Voice Channel.",
  guildOnly: true,
  aliases: ["dc"],
  run: async (message) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) {
      return message.reply("There is No Music Playing around you!");
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
    await message.react("👋");
    await player.disconnect();
    await message.reply("Bye!");
  },
};
