const discord = require("discord.js");

module.exports = {
	name: "MemberCount",
	description: "displays members count in the server",
	aliases: ["members", "stats"],
	guildOnly: true,
	run: (message) => {
		const totalMembers = message.guild.members.cache.filter(
			(member) => !member.user.bot
		).size;
		const onlineMembers = message.guild.members.cache.filter(
			(member) => member.presence.status == "online"
		).size;
		const offlineMembers = message.guild.members.cache.filter(
			(member) => member.presence.status == "offline"
		).size;
		const idleMembers = message.guild.members.cache.filter(
			(member) => member.presence.status == "idle"
		).size;
		const dndMembers = message.guild.members.cache.filter(
			(member) => member.presence.status == "dnd"
		).size;
		const bots = message.guild.members.cache.filter((member) => member.user.bot)
			.size;

		const statsEmbed = new discord.MessageEmbed()
			.setTitle(`Server Stats of ${message.guild.name}`)
			.setColor("BLUE")
			.setDescription(
				`<:CryptonMember:814771312580755456>  **Total Members(Humans): **${totalMembers}
       <:CryptonBot:814771312114532362> **Bots: ** ${bots}
      <:CryptonOnline:814771314161090560> **Members Online: ** ${onlineMembers}
       <:CryptonOffline:814771313306632202> **Members Offline: ** ${offlineMembers}
      <:CryptonIdle:814894774971793438> **Idle Members: ** ${idleMembers}
      <:CryptonDnd:814771315739066368> **Dnd Members:** ${dndMembers}`
			)
			.setTimestamp()
			.setThumbnail(message.guild.iconURL())
			.setFooter("Server Stats");
		message.channel.send(statsEmbed);
	},
};
