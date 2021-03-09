const discord = require("discord.js");

module.exports =
{
	name: "Status",
	description: "Status of the bot!",
	cooldown: 3,
	run: async(message) => {
		const embed = new discord.MessageEmbed();
		embed.setTitle("Status page");
		embed.setURL("https://stats.uptimerobot.com/wR42GsLENL");
		embed.setImage("https://cdn.discordapp.com/attachments/552369282818900008/808672895719047168/IMG_20210209_174708.jpg");

		message.channel.send(embed);
	}
};