const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "players",
  devOnly: true,
  run: (message) => {
    const playersMap = message.client.manager.players;
    // console.log(playersMap);
    let players = "";
    playersMap.forEach((player) => {
      const { name } = message.client.guilds.cache.get(player.options.guild);
      players += `-${name}\n`;
    });
    // console.log(playersMap.length, playersMap.size);
    const playersEmbed = new MessageEmbed()
      .setAuthor("Crypton Devs")
      .setTitle(`Currently playing music in ${playersMap.size} Servers.`)
      .setColor("#2DDBE2")
      .setDescription(players);
    message.channel.send(playersEmbed);
  },
};
