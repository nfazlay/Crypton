const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
	name: "shit",
	run: async (message) => {
		const user = message.author || message.mentions.users.first();
		const avatar = user.displayAvatarURL({ format: "png" });
		const wantedImage = await Canvas.shit(avatar);
		const attachment = new MessageAttachment(wantedImage, "Wanted.gif");
		message.channel.send(attachment);
	},
};
