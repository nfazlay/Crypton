const economyDb = require("../../models/modelEconomy");
const discord = require("discord.js");

module.exports = {
    name: "Balance",
    description: "Check your balance, if you have any",
    run: async (message) => {

        const user = message.mentions.users.first() || message.author;

        const economyData = await economyDb.findOne({
            userId: user.id,
        });

        if (economyData) {

            const embed = new discord.MessageEmbed()
            .setColor("BLUE")
            .setAuthor(user.username, user.displayAvatarURL())
            .setTimestamp()
            .addField("Money", `$${economyData.cash}`)
            .addField("Level", economyData.level)
            .setTitle(`Balance of ${user.username}`);

            message.channel.send(embed);
        } else if (!economyData) {
            message.channel.send(`No cash found in ${user.username}'s bank`);
        }
    }
};