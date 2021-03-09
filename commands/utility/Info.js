const discord = require("discord.js");
module.exports = {
	name: "Info",
	aliases: ["serverinfo"],
	description: "Info Of The Server",
	guildOnly: true,
	run: async (message) => {
		const channels = message.guild.channels.cache.filter(
			channel => channel.type == "text"
		);

		const invite = await channels.first().createInvite();

		const embed = new discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle(`${message.guild.name}`)
			.setTimestamp()
			.setFooter("Information about the server..")
			.setURL(`${invite}`)
			.setImage(`${message.guild.iconURL()}`)
			.addFields(
				{ name: "Owner", value: `${message.guild.owner}` },
				{ name: "Region", value: `${message.guild.region}` },
				{ name: "Channels", value: `${message.guild.channels.cache.size}` },
				{ name: "Roles", value: `${message.guild.roles.cache.size}` },
				{ name: "Members", value: `${message.guild.memberCount}` }
			);
		message.channel.send(embed);
	}
};
