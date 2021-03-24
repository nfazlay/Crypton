const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "queue",
  description: "Gives the Current Queue of The Server",
  guildOnly: true,
  aliases: ["que", "q"],
  run: async (message) => {
    const player = message.client.manager.get(message.guild.id);
    if (!player) {
      message.reply("There is no Music Playing around you!");
      return;
    }
    const { queue } = player;
    if (!queue) {
      message.reply(
        "Play some Songs, since there is Nothing to show in Queue!"
      );
      return;
    }
    const currentSong = queue.current;
    const queueinfo = `Total Duration: ${ms(queue.duration)} | Total Songs: ${
      queue.totalSize
    }`;
    // console.log(queue);
    //eslint-disable-next-line
    let queueTracks = ``;

    for (let counter = 0; counter < queue.length; ++counter) {
      queueTracks += `#${counter + 1} [${queue[counter].title}](${
        queue[counter].uri
      })
      Duration: ${ms(queue[counter].duration)} | Requested by: <@${
        queue[counter].requester.id
      }> \n\n`;
    }
    // queue.forEach((song) => {
    //   queueTracks += ``;
    // });

    const nowPlaying = `**Now Playing  : ** \n[${currentSong.title}](${
      currentSong.uri
    })\nDuration: ${ms(currentSong.duration)} | Requested by: <@${
      currentSong.requester.id
    }>\n`;
    const queueEmbed = new discord.MessageEmbed()
      .setAuthor("Crypton Music Queue")
      .setTitle(queueinfo)
      .setThumbnail(currentSong.thumbnail)
      .setColor("#00ffff")
      .setDescription(`${nowPlaying}\n **Coming Next  :**\n\n${queueTracks}`)
      .setFooter(`Volume: ${player.volume}`);

    message.channel.send(queueEmbed);
    // console.log(ms(queue.duration));
  },
};
