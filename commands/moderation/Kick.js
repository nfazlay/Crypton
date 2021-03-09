const discord = require("discord.js");
module.exports = {
	name: "Kick",
	description: "This is Kick Command!",
	cooldown: "0",
	guildOnly: true,
	permissions: "KICK_MEMBERS",
	run: async (message) => {
		const member = message.mentions.members.first();

		if (!member) {
			const embed = new discord.MessageEmbed()
				.setColor("#FF4500")
				.setDescription("You didn't mention anyone");
			return message.channel.send(embed);
		}

		member.kick();
		const embed = new discord.MessageEmbed()
			.setDescription(`**${member} was kicked. ||** ${message.content.split(`${member}`)[1]}`)
			.setColor("#5CF37F");
		message.channel.send(embed);
	}
};
