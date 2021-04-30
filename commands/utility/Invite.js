const discord = require("discord.js");

module.exports = {
	name: "Invite",
	description: "Invite me in your other servers too!",
	cooldown: 3,
	run: async (message) => {
		const embed = new discord.MessageEmbed()
			.setAuthor("Invite Me")
			.setDescription(
				`
	[Click Here](https://discord.com/api/oauth2/authorize?client_id=804588003791208478&permissions=8&scope=bot) to Invite me
	`
			)
			.setColor("#2ddbe2");
		//   .setThumbnail(message.client.user.displayAvatarURL());

		message.channel.send(embed);
	},
};
