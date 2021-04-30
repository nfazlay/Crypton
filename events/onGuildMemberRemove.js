const leaverDb = require("../models/modelLeaving");
const { Leaver } = require("canvacord");
const discord = require("discord.js");

module.exports = {
	name: "guildMemberRemove",
	run: async (member) => {

		const leaveData = await leaverDb.findOne({
			guildId: member.guild.id
		});

		if (leaveData) {

			const leaveCard = new Leaver()
				.setColor("BLUE")
				.setMemberCount(member.guild.memberCount)
				.setUsername(member.user.username)
				.setDiscriminator(member.user.discriminator)
				.setGuildName(member.guild.name)
				.setAvatar(member.user.displayAvatarURL({ dynamic: false, format: "png" }));

			if (leaveData.message && leaveData.channel && member.guild.channels.cache.get(leaveData.channel)) {
				let msg = leaveData.message;

				if (msg.includes("{user}")) {
					msg = msg.replace("{user}", member.user.username);
				}
				if (msg.includes("{server}")) {
					msg = msg.replace("{server}", member.guild.name);
				}
				leaveCard.textMessage = msg;
				leaveCard.build().then(async (data) => {
					const attachment = new discord.MessageAttachment(data, "LeaveCard.png");
					member.guild.channels.cache.get(leaveData.channel).send(attachment);
				});
			}
		}
	}
};
