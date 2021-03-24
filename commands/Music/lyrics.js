/* eslint-disable */
const axios = require("axios");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "lyrics",
  run: async (message, args) => {
    const LyricsEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `Under Development | Raise Ticket [here](https://discord.gg/fRVtnW8kY8) for Faster Development`
      );

    message.channel.send(LyricsEmbed);
  },
};
