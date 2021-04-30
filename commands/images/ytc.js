const { MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
	name: "ytc",
	run: async (message, args) => {
		const user = message.author;
		const avatar = user.displayAvatarURL({ format: "png" });
		// const attachment = new MessageAttachment(jailImage, "jail.gif");
		// message.channel.send(attachment);
		const ops = {
			username: user.username,
			dark: true,
			avatar: avatar,
			content: args.join(" "),
		};
		const youtubeComment = await Canvas.youtube(ops);

		const attachment = new MessageAttachment(youtubeComment, "ytc.gif");
		message.channel.send(attachment);
	},
};
