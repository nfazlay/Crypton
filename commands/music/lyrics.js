/* eslint-disable */
const axios = require("axios");
const MusicxMatch = require("@raflymln/musixmatch-lyrics");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "lyrics",
  run: async (message, args) => {
    // const API_URL = `https://api.musixmatch.com/ws/1.1/`;
    // axios
    //   .get(API_URL, {
    //     params: {
    //       format: "jsonp",
    //       callback: "callback",
    //       q_track: "no idea",
    //     },
    //     Headers: {
    //       Authorization: "dd8caa76e9a518faa23ec843b32abf22",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(JSON.stringify(res.data));
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // let res;
    // res = await MusicxMatch.find(args.join(" "));
    // // console.log(res);
    // const lyricsEmbed = new MessageEmbed()
    //   .setDescription(res.lyrics)
    //   .setColor("#2DDBE2")
    //   .setThumbnail(res.albumImg)
    //   .setTitle(`${res.title} - ${res.artists}`)
    //   .setURL(res.url)
    //   .setAuthor("Crypton Lyrics");
    // console.log(res);
    // message.channel.send(lyricsEmbed);
    const LyricsEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        "Under Development | Raise Ticket [here](https://discord.gg/fRVtnW8kY8) for Faster Development"
      );

    message.channel.send(LyricsEmbed);
  },
};
