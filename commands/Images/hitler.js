const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "opinion",
  run: async (message, args) => {
    const user = message.mentions.users.first() || message.author;
    const msg = args.join(" ");
    const avatar = user.displayAvatarURL({ format: "png" });
    const wantedImage = await Canvas.opinion(avatar, msg);
    const attachment = new MessageAttachment(wantedImage, "Wanted.gif");
    message.channel.send(attachment);
  },
};
