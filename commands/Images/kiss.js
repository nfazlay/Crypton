const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "kiss",
  run: async (message) => {
    const user1 = message.mentions.users.first();
    const user2 = message.author;
    const avatar2 = user2.displayAvatarURL({ format: "png" });

    const avatar1 = user1.displayAvatarURL({ format: "png" });
    const KissImage = await Canvas.kiss(avatar1, avatar2);
    const attachment = new MessageAttachment(KissImage, "Kiss.gif");
    message.channel.send(attachment);
  },
};
