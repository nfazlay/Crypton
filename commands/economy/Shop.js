const shopListJson = require("../../json/shoplist.json");
const defaultJson = require("../../json/defaults.json");
const economyDb = require("../../models/modelEconomy");
const discord = require("discord.js");

module.exports = {
    name: "Shop",
    description: "Buy something from the shop",
    run: async (message) => {

        const economyData = await economyDb.findOne({
            userId: message.author.id
        });

        const embed = new discord.MessageEmbed()
            .setTitle("Super Market")
            .setColor("BLUE")
            .setTimestamp()
            .setAuthor("Stonks?")
            .setFooter("What would you like to have?");

        const shoplist = [];
        for (const key in shopListJson) {
            shoplist.push(key);
            const cash = economyData.cash || defaultJson["defaultcash"];
            if (cash >= shopListJson[key].price) {
                embed.addField(`:green_square: ${key}`, `Price: ${shopListJson[key].price}`);
            } else if (cash < shopListJson[key].price) {
                embed.addField(`:red_square: ${key}`, `Price: ${shopListJson[key].price}`);
            }
        }
        message.channel.send(embed);


        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
        collector.on("collect", msg => {
            const toBuy = msg.content.toLowerCase()[0].toUpperCase() + msg.content.toLowerCase().substring(1);
            if (shoplist.includes(toBuy)) {
                const cashNeeded = shopListJson[toBuy].price;
                if (economyData) {
                    if (economyData.cash >= cashNeeded) {
                        const Item = economyData.inventory.filter(obj => obj.Name === toBuy);
                        if (Item && Item.length > 0) {
                            const position = economyData.inventory.indexOf(Item[0]);
                            economyData.inventory[position].Numbers += 1;
                            economyData.markModified("inventory");
                            economyData.cash -= cashNeeded;
                            economyData.save();
                        } else if (!Item || Item.length === 0) {
                            economyData.inventory.unshift({
                                Name: toBuy,
                                Numbers: 1
                            });
                            economyData.cash -= cashNeeded;
                            economyData.save();
                        }
                        return message.channel.send(`Bought ${toBuy} successfully!`);
                    } else if (economyData.cash < cashNeeded) {
                        return message.channel.send(`You need ${cashNeeded} to buy ${toBuy}`);
                    }
                } else if (!economyData) {
                        const newData = new economyDb({
                            userId: message.author.id,
                            cash: defaultJson["defaultCashOnStart"],
                            level: defaultJson["defaultLevel"],
                            inventory: [],
                        });

                        if (newData.cash >= cashNeeded) {
                            newData.inventory.unshift({
                                Item: {
                                    Name: toBuy,
                                    Numbers: 1
                                }
                            });
                            newData.cash -= cashNeeded;
                            message.channel.send(`Bought ${toBuy} successfully!`);
                        } else if (newData.level < cashNeeded) {
                            message.channel.send(`You need ${cashNeeded} to buy ${toBuy}`);
                        }
                        newData.save();
                    }
                } else if (!shoplist.includes(toBuy)) {
                    return message.channel.send("Woops we dont have that!");
                }
        });
    }
};
