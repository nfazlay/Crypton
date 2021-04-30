/* eslint-disable */
const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const { getLyrics } = require("genius-lyrics-api");

module.exports = {
  name: "lyrics",
  run: async (message) => {
    const player = message.client.manager.get(message.guild.id);
		const track = player.queue.current;
    const headers = {
      apiKey:"V6KhN21HTGzTSKLupxxcCbGxnfU8gPL1seiHln5MuqSP6spFk_SH9-0j3zbmY0Ft",
      title: track.title,
      artist: "",
      optimizeQuery: true,
    };
    getLyrics(headers).then(lyrics => {
      console.log(lyrics)
      const LyricsEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Lyrics")
        .setTimestamp()
        .setDescription(lyrics);
        message.channel.send(LyricsEmbed);
    })
  },
};
