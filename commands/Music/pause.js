module.exports = {
  name: "pause",
  description: "Pauses The playing Song",
  guildOnly: true,
  aliases: ["pse", "hold"],
  run: async (message) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) {
      return message.reply("There is no music playing around you!");
    }
    const { channel } = message.member.voice;
    if (!channel) {
      return message.reply(
        "Your not in a VC, please join a vc to use this cmmand."
      );
    }
    if (channel.id != player.voiceChannel) {
      return message.reply(
        "You are not in the Vc in which the Music is being played, please join that vc to Pause!"
      );
    }
    if (player.paused) {
      return message.reply("Music is already paused!");
    }
    await message.react("⏸️");
    player.pause(true);
    return message.reply("Paused the Music!");
  },
};
