const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "shuffle",
  run: (message) => {
    // const player = message.client.manager.get(message.guild.id);
    // const position = Number(args[0]);
    // player.seek(position);
    // message.reply("Seeked");
    const LyricsEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        "Under Development | Raise Ticket [here](https://discord.gg/fRVtnW8kY8) for Faster Development"
      );

    message.channel.send(LyricsEmbed);
  },
};
