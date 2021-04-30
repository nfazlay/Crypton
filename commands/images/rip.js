const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
	name: "rip",
	run: async (message) => {
		const user = message.mentions.users.first() || message.author;
		const avatar = user.displayAvatarURL({ format: "png" });
		const ripImage = await Canvas.rip(avatar);
		const attachment = new MessageAttachment(ripImage, "rip.gif");
		message.channel.send(attachment);
	},
};
