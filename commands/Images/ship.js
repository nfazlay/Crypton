// const { MessageAttachment } = require("discord.js");
// const { Canvas } = require("canvacord");
const fetch = require("node-fetch");
module.exports = {
  name: "ship",
  run: async (message) => {
    const user1 = message.mentions.users.first();
    const user2 = message.author;
    const avatar2 = user2.displayAvatarURL({ format: "png" });

    const avatar1 = user1.displayAvatarURL({ format: "png" });
    // const KissImage = await Canvas.kiss(avatar1, avatar2);
    // const attachment = new MessageAttachment(KissImage, "Kiss.gif");
    // message.channel.send(attachment);
    fetch(
      `https://nekobot.xyz/api/imagegen?type=ship&user1=${avatar1}&user2=${avatar2}`
    )
      .then((res) => res.json())
      .then((data) => {
        message.channel.send(data.message);
      });
  },
};
