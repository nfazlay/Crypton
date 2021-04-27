const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "trash",
  run: async (message) => {
    const user = message.mentions.users.first() || message.author;
    const avatar = user.displayAvatarURL({ format: "png" });
    const trashImage = await Canvas.trash(avatar);
    const attachment = new MessageAttachment(trashImage, "trash.gif");
    message.channel.send(attachment);
  },
};
