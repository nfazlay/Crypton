const { MessageEmbed } = require("discord.js");
// const { Canvas } = require("canvacord");
const fetch = require("node-fetch");

module.exports = {
  name: "thret",
  run: async (message) => {
    const user = message.mentions.users.first();
    const avatar = user.displayAvatarURL({ format: "png" });
    fetch(`https://nekobot.xyz/api/imagegen?type=threats&url=${avatar}`)
      .then((res) => res.json())
      .then((data) => {
        const trpImage = new MessageEmbed().setImage(data.message);

        message.channel.send(trpImage);
      });
  },
};
