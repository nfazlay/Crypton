const shopListJson = require("../../json/shoplist.json");
const defaultJson = require("../../json/defaults.json");
const economyDb = require("../../models/modelEconomy");

module.exports = {
	name: "Use",
	description: "Use an item from your inventory",
	args: true,
	usage: "<item>",
	run: async (message, args) => {
		const toUse = args[0].toLowerCase()[0].toUpperCase() + args[0].toLowerCase().substring(1);
		const economyData = await economyDb.findOne({
			userId: message.author.id
		});
		if (economyData) {
			const Item = economyData.inventory.filter(obj => obj.Name === toUse);
			if (Item && Item.length > 0) {
				const position = economyData.inventory.indexOf(Item[0]);
				console.log(position + economyData.inventory[position].Numbers);
				economyData.inventory[position].Numbers -= 1;
				economyData.save();
				return message.channel.send(shopListJson[toUse].message || `You just used ${toUse}!`);
			} else if (!Item || Item.length === 0) {
				return message.channel.send(`You dont have ${toUse} but you might wanna checkout the shop in case?`);
			}
		} else if (!economyData) {
			const newData = new economyDb({
				userId: message.author.id,
				cash: defaultJson["defaultCashOnStart"],
				level: defaultJson["defaultLevel"],
			});
			newData.save();
			return message.channel.send(`You dont have ${toUse}`);
		}
	}
};
