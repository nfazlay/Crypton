const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "wasted",
  run: async (message) => {
    const user = message.mentions.users.first() || message.author;
    const avatar = user.displayAvatarURL({ format: "png" });
    const wastedImage = await Canvas.wasted(avatar);
    const attachment = new MessageAttachment(wastedImage, "Wasted.gif");
    message.channel.send(attachment);
  },
};
