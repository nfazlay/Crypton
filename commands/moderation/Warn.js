const discord = require("discord.js");
module.exports =
{
	name: "Warn",
	description: "Warn people in a server",
	cooldown: "0",
	args: true,
	usage: "@MemberMention",
	guildOnly: true,
	permissions: "KICK_MEMBERS",
	run: async(message, args) => {
		const embed = new discord.MessageEmbed()
			.setDescription(`**${message.mentions.members.first()} was warned for** ${args.slice(1).join(" ")}`)
			.setColor("#56F99C");
		message.channel.send(embed);
	},
};