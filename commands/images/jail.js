const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
	name: "jail",
	run: async (message) => {
		const user = message.mentions.users.first() || message.author;
		const avatar = user.displayAvatarURL({ format: "png" });
		const jailImage = await Canvas.jail(avatar);
		const attachment = new MessageAttachment(jailImage, "jail.gif");
		message.channel.send(attachment);
	},
};
