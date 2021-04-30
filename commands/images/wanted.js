const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
	name: "wanted",
	run: async (message) => {
		const user = message.mentions.users.first() || message.author;
		const avatar = user.displayAvatarURL({ format: "png" });
		const wantedImage = await Canvas.wanted(avatar);
		const attachment = new MessageAttachment(wantedImage, "Wanted.gif");
		message.channel.send(attachment);
	},
};
