module.exports = {
  name: "skip",
  description: "Skips the current song to next one",
  guildOnly: true,
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
    if (!player.queue.current) {
      return message.reply("Play some songs to Skip!");
    }
    const { title } = player.queue.current;

    await message.react("⏭️");
    player.stop();
    return message.reply(`Skipped the song \`${title}\``);
  },
};
