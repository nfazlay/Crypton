const { MessageEmbed } = require("discord.js");
// const canvacord = require("canvacord");

module.exports = {
  name: "nowplaying",
  description: "Gives information of Current Playing Song",
  guildOnly: true,
  aliases: ["current", "np", "cp"],
  run: async (message) => {
    const LyricsEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        "Under Development | Raise Ticket [here](https://discord.gg/fRVtnW8kY8) for Faster Development"
      );

    message.channel.send(LyricsEmbed);
    // const player = message.client.manager.get(message.guild.id);
    // const currentSong = player.queue.current;
    // const nowPlayingCard = new canvacord.Spotify()
    //   .setAlbum("Crypton Music")
    //   .setAuthor(currentSong.author)
    //   .setImage(currentSong.thumbnail)
    //   .setTitle(currentSong.title)
    //   .setEndTimestamp(currentSong.duration)
    //   .setStartTimestamp("2:06");
    // nowPlayingCard.build(async (card) => {
    //   const a = new MessageAttachment(card, "Spotify.png");
    //   await message.channel.send(a);
    // });
  },
};
