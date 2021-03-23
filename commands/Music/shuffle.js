const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "shuffle",
  run: (message) => {
    // const player = message.client.manager.get(message.guild.id);
    // const { queue } = player;
    // queue.shuffle();
    // message.reply("Shulffled The Queue");
    const LyricsEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        "Under Development | Raise Ticket [here](https://discord.gg/fRVtnW8kY8) for Faster Development"
      );

    message.channel.send(LyricsEmbed);
  },
};
