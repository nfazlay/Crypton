const defaultJson = require("../../json/defaults.json");
const economyDb = require("../../models/modelEconomy");
const discord = require("discord.js");

module.exports = {
	name: "Inventory",
	description: "Shows the inventory of someone",
	run: async (message) => {

		const user = message.mentions.users.first() || message.author;

		const economyData = await economyDb.findOne({
			userId: user.id
		});

		if (economyData) {
			const embed = new discord.MessageEmbed()
				.setColor("BLUE")
				.setAuthor(user.username, user.displayAvatarURL())
				.setTimestamp()
				.setTitle(`Inventory of ${user.username}`);

			economyData.inventory.forEach(element => {
				embed.addField(element.Name, element.Numbers);
			});
			message.channel.send(embed);
		} else if (!economyData) {
			const newData = new economyDb({
				userId: user.id,
				cash: defaultJson["defaultCashOnStart"],
				level: defaultJson["defaultLevel"],
			});
			newData.save();
			return message.channel.send(`${user.username} doesn't has anything :thinking:`);
		}
	}
};
