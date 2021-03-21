module.exports = {
  name: "resume",
  description: "Resumes the Paused Song",
  guildOnly: true,
  aliases: ["res"],
  run: async (message) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) {
      return message.reply("there is no music playing around you!");
    }
    const { channel } = message.member.voice;
    if (!channel) {
      return message.reply("You need to join a vc to run this command.");
    }
    if (channel.id != player.voiceChannel) {
      return message.reply(
        "You are not in a channel where music is being played!"
      );
    }

    if (!player.paused) {
      return message.reply("Music is not paused to Resume it!");
    }
    await message.react("▶️");
    player.pause(false);
    return message.reply("Music has been resumed!");
  },
};
