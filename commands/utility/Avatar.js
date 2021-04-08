const discord = require("discord.js");
module.exports = {
	name: "Avatar",
	description: "Sends your avatar!",
	aliases: ["icon", "pfp"],
	run: async (message) => {

		const user = message.mentions.users.first() || message.author;

		const embed = new discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle(`${user.username}`)
			.setDescription("Looking good today!")
			.setURL(user.displayAvatarURL())
			.setImage(user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }));

		return message.channel.send(embed);
	},
};