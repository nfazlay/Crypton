// const { MessageAttachment } = require("discord.js");
const { MessageEmbed } = require("discord.js");

const ms = require("ms");
// const canvacord = require("canvacord");
// const Canvas = require("canvas");

module.exports = {
  name: "nowplaying",
  description: "Gives information of Current Playing Song",
  guildOnly: true,
  aliases: ["current", "np", "cp"],
  run: async (message) => {
    const player = message.client.manager.get(message.guild.id);
    const track = player.queue.current;
    // const card = new canvacord.Spotify()
    //   .setAuthor(currentSong.author)
    //   .setAlbum("Crypton Music")
    //   .setProgressBar("TRACK", "#ffff00")
    //   .setStartTimestamp(player.position)
    //   .setProgressBar("BAR", "#ffffff")
    //   .setEndTimestamp(currentSong.duration)
    //   .setImage(currentSong.displayThumbnail("mqdefault"))
    //   .setTitle(currentSong.title);
    // console.log(currentSong.duration, player.position);

    // card.build().then((builtCard) => {
    //   const attachment = new MessageAttachment(builtCard, "Spotify.png");
    //   // message.channel.send(attachment);
    //   console.log(card.progressBar);
    //   console.log(currentSong.duration, player.position);
    //   console.log(card.start);
    //   console.log(card.end);
    //   console.log(card.background);

    //   const npM = new MessageEmbed()
    //     .setTitle("Now Playing")
    //     .attachFiles(attachment)
    //     .setImage("attachment://Spotify.png")
    //     .setColor(3092790);
    //   message.channel.send(npM);
    // });

    // const currentDur = `${new Date(player.position).getMinutes()}:${new Date(
    //   player.position
    // ).getSeconds()}`;
    // const songDur = `${new Date(currentSong.duration).getMinutes()}:${new Date(
    //   currentSong.duration
    // ).getSeconds()}`;
    // // console.log(String(new Date(player.position)).substring(0));
    // // console.log();
    // const getDuration = (date) => {
    //   const str = String(new Date(date));
    //   const words = str.split(".");
    //   const time = words[0].split(":");
    //   time.shift();
    //   return time.join(":");
    // };

    // console.log("DURATION:", getDuration(player.position));

    // const canvas = Canvas.createCanvas(600, 150);
    // const ctx = canvas.getContext("2d");
    // ctx.fillStyle = "#2F3136";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // const TrackImage = await Canvas.loadImage(
    //   currentSong.displayThumbnail("mqdefault")
    // );
    // ctx.drawImage(TrackImage, 30, 15, 120, 120);
    // const TrackName = `${currentSong.title.substring(0, 31).trim()}...`;
    // ctx.fillStyle = "#FFFFFF";
    // ctx.font = "bold 25px Manrope";
    // ctx.fillText(TrackName, 170, 40);
    // ctx.font = "20px Manrope";
    // const Author = `By ${currentSong.author}`;
    // ctx.fillText(Author, 170, 65);
    // ctx.font = "15px Manrope";
    // const Album = "On Crypton Music";
    // ctx.fillText(Album, 170, 85);
    // ctx.fillStyle = "#B3B3B3";
    // ctx.font = "14px Manrope";
    // ctx.fillText(songDur, 430, 130);
    // ctx.fillStyle = "#B3B3B3";
    // ctx.font = "14px Manrope";
    // ctx.fillText(currentDur, 170, 130);

    // const attachment = new MessageAttachment(canvas.toBuffer());
    // message.channel.send(attachment);
    // message.channel.send("Comming Soon");
    const playingEmbed = new MessageEmbed()
      .setAuthor("Crypton Music Now Playing")
      .setColor(3092790)
      .setTitle(`${track.title}`)
      .setThumbnail(track.displayThumbnail("maxresdefault"))
      .setURL(track.uri)
      .setFooter(`Req. by ${track.requester.tag}`)
      .addFields(
        {
          name: "Author:",
          value: track.author,
          inline: true,
        },
        {
          name: "Duration:",
          value: ms(track.duration),
          inline: true,
        }
      );
    message.channel.send(playingEmbed);
  },
};
