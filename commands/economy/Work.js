const economyDb = require("../../models/modelEconomy");
const prefixDb = require("../../models/modelPrefix");
const defaultJson = require("../../json/defaults.json");

module.exports = {
    name: "Work",
    description: "Work to earn money!",
    run: async (message) => {

        const economyData = await economyDb.findOne({
            userId: message.author.id,
        });
        const prefixData = await prefixDb.findOne({
            guildId: message.guild.id,
        });
        if (economyData) {
            if (!economyData.workingAs) {
                return message.channel.send(`You dont have a job, yet. ${prefixData}works to get one!`);
            }
			if (economyData.lastWorked + defaultJson["defaultWorkInterval"] > Date.now()) {
				const timeLeft = new Date(economyData.lastWorked + defaultJson["defaultWorkInterval"] - Date.now());
				return message.channel.send(`You need to wait ${timeLeft.getHours()}hrs ${timeLeft.getMinutes()}mins and ${timeLeft.getSeconds()}seconds before reusing the command!`);
			}
            const moneyToAdd = defaultJson["defaultCashOnWork"] * economyData.level;
            economyData.cash += moneyToAdd;
			economyData.lastWorked = Date.now();
            economyData.save();
            message.channel.send(`You worked as a ${economyData.workingAs} and earned ${moneyToAdd}!`);
        } else if (!economyData) {
            const newData = new economyDb({
                userId: message.author.id,
                cash: defaultJson["defaultCashOnStart"],
                level: defaultJson["defaultLevel"],
            });
            newData.save();
            message.channel.send(`You dont have a job, yet! ${prefixData.prefix || process.env.PREFIX}works to get one!`);
        }
    }
};
