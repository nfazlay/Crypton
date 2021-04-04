/* eslint-disable */
const axios = require("axios");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "lyrics",
  run: async (message, args) => {
    // const songName = args.join("%20");
    // const songIdApiUri = `https://api.genius.com/search?q=${songName}`;
    // const headers = {
    //   Authorization:
    //     "Bearer " +
    //     "V6KhN21HTGzTSKLupxxcCbGxnfU8gPL1seiHln5MuqSP6spFk_SH9-0j3zbmY0Ft",
    // };
    // const { data } = await axios.get(songIdApiUri, { headers });
    // const { hits } = data.response;
    // console.log(hits[0]);
    // const songID = hits[0].result.id;
    // const lyricsApiUri = `https://api.genius.com/songs/${songID}`;

    // const { data: lyricsData } = await axios.get(lyricsApiUri, { headers });
    // console.log(lyricsData);
    // console.log(data);
    const LyricsEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        "Under Development | Raise Ticket [here](https://discord.gg/fRVtnW8kY8) for Faster Development"
      );

    message.channel.send(LyricsEmbed);
  },
};
