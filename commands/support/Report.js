const discord = require ("discord.js");
module.exports = {
    name: "Report",
    description: "Reports a bug",
    cooldown: "5",

    run: async (message) => {
        const embed = new discord.MessageEmbed()
        .setAuthor("Crypton")
        .setDescription("Report bug [Here](https://github.com/Crypton-Technologies/Crypton/issues) Feel free to share your problems with our developers")
        .setColor("#5CF398");
        message.channel.send(embed);
    }
};
