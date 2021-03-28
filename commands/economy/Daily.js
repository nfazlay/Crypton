const economyDb = require("../../models/modelEconomy");
const defaultJson = require("../../json/defaults.json");

module.exports = {
    name: "Daily",
    description: "Free money?",
    run: async (message) => {

        const economyData = await economyDb.findOne({
            userId: message.author.id,
        });

        if (economyData) {
            if (economyData.lastRedeemedDaily + defaultJson["defaultDailyInterval"] > Date.now()) {
				const timeLeft = new Date(economyData.lastWorked + defaultJson["defaultDailyInterval"] - Date.now());
				return message.channel.send(`You need to wait ${timeLeft.getHours()}hrs ${timeLeft.getMinutes()}mins and ${timeLeft.getSeconds()}seconds before reusing the command!`);
			}
            economyData.cash += defaultJson["defaultDailyCash"] * economyData.level;
            economyData.lastRedeemedDaily = Date.now();
			economyData.save();
            message.channel.send(`$${defaultJson["defaultDailyCash"] * economyData.level} was added in your account!`);
        } else if (!economyData) {
            const newData = new economyDb({
                userId: message.author.id,
                cash: defaultJson["defaultCashOnStart"],
                level: defaultJson["defaultLevel"],
				lastRedeemedDaily: Date.now(),
            });
            newData.cash += defaultJson["defaultDailyCash"] * newData.level;
            message.channel.send(`$${defaultJson["defaultDailyCash"] * newData.level} was added in your account!`);
            newData.save();
        }
    }
};
