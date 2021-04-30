const discord = require("discord.js");
module.exports = {
	name: "Ban",
	description: "This is ban Command!",
	cooldown: "0",
	guildOnly: true,
	permissions: "BAN_MEMBERS",
	run: async (message, args, prefix) => {
		if (!args.length) {
			const noArgs = new discord.MessageEmbed()
				.setAuthor("Crypton Moderation")
				.setDescription(
					`**No Use was Mentioned**

				Usage: ${prefix}ban <@user-id> reason
				`
				)
				.setColor("RED");

			return message.channel.send(noArgs);
		}
		const user = message.mentions.users.first();
		message.guild.members.ban(user);
		const embed = new discord.MessageEmbed()
			.setColor("#00FF7F")
			.setDescription(
				`**${user} was banned. ||** ${message.content.split(`${user}`)[1]}`
			);
		message.channel.send(embed);
	},
};
