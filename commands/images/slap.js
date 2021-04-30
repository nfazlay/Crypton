const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
	name: "slap",
	run: async (message) => {
		const user1 = message.mentions.users.first();
		const user2 = message.author;
		const avatar2 = user2.displayAvatarURL({ format: "png" });

		const avatar1 = user1.displayAvatarURL({ format: "png" });
		const slapImage = await Canvas.slap(avatar1, avatar2);
		const attachment = new MessageAttachment(slapImage, "slap.gif");
		message.channel.send(attachment);
	},
};
