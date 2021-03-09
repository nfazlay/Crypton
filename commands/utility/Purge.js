const discord = require("discord.js");

module.exports = {
	name: "Purge",
	aliases:["clear"],
	description: "Clear Up Messages",
	args: true,
	usage: "number",
	guildOnly: true,
	permissions: "MANAGE_MESSAGES",
	run: async (message, args) => {

		const amount = parseInt(args[0]) + 1;
		if (isNaN(amount)) {
			const embed = new discord.MessageEmbed()
				.setDescription("That is not a number")
				.setColor("#F95656");
			message.delete();
			return message.channel.send(embed);
		} else if (amount <= 1 || amount > 100) {
			const embed = new discord.MessageEmbed()
				.setDescription("Enter a Number between 1 and 99")
				.setColor("#F95656");
			message.delete();
			return message.channel.send(embed);
		}
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			const embed = new discord.MessageEmbed()
				.setDescription("There was an error trying to prune messages in this channel!")
				.setColor("#F95656");
			message.channel.send(embed);
		}
		);
	}
};
