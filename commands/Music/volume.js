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
    if (!args.length) {
      message.reply(`Current Volume is ${player.volume}`);
      return;
    }
    const { channel } = message.member.voice;
    if (!channel) {
      message.reply("You have to join Voice Channel to Run this Command");
      return;
    }
    if (channel.id !== player.voiceChannel) {
      message.reply("You are not in the same voice channel!");
      return;
    }
    const volume = Number(args[0]);
    if (!volume || volume < 1 || volume > 100) {
      message.reply("Please give a Volume between 1 and 100");
      return;
    }
    player.setVolume(volume);
    return message.reply(`Volume set to ${volume}`);
  },
};
