const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
	name: "trigger",
	run: async (message) => {
		const user = message.mentions.users.first() || message.author;
		const avatar = user.displayAvatarURL({ format: "png" });
		const triggerImage = await Canvas.trigger(avatar);
		const attachment = new MessageAttachment(triggerImage, "Trigger.gif");
		message.channel.send(attachment);
	},
};
