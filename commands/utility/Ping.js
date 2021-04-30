const discord = require("discord.js");
module.exports = {
	name: "Ping",
	description: "This is Ping Command!",
	aliases: ["beep"],
	cooldown: "4",
	run: async (message) => {
		const embed = new discord.MessageEmbed()
			.setDescription("Calculating ping...")
			.setColor("#5CF398");
		message.channel.send(embed).then((msg) => {
			const ping = msg.createdTimestamp - message.createdTimestamp;
			embed.setDescription(`**Bot ping:** ${ping}
			**Api Ping:** ${message.client.ws.ping}`);
			embed.setColor("#5CF398");
			msg.edit(embed);
		});
	},
};
