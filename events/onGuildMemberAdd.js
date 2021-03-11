const welcomeDb = require("../models/modelWelcoming");
const { Welcomer } = require("canvacord");
const discord = require("discord.js");

module.exports = {
	name: "guildMemberAdd",
	run: async (member) => {
		const welcomeData = await welcomeDb.findOne({
			guildId: member.guild.id
		});
		if (welcomeData) {

			const welcomeCard = new Welcomer()
			.setColor("BLUE")
			.setMemberCount(member.guild.memberCount)
			.setUsername(member.user.username)
			.setDiscriminator(member.user.discriminator)
			.setGuildName(member.guild.name)
			.setAvatar(member.displayAvatarURL({ dynamic: false, format: "png" }));

			if (welcomeData.role && member.guild.roles.cache.get(welcomeData.role)) {
				member.roles.add(welcomeData.role);
			}
			if (welcomeData.message && welcomeData.channel && member.guild.channels.cache.get(welcomeData.channel)) {
				let msg = welcomeData.message;

				if (msg.includes("{user}")) {
					msg = msg.replace("{user}", member.user.username);
				}
				if (msg.includes("{server}")) {
					msg = msg.replace("{server}", member.guild.name);
				}
				welcomeCard.textMessage = msg;
				welcomeCard.build().then(async (data) => {
					const attachment = new discord.MessageAttachment(data, "WelcomeCard.png");
					member.guild.channels.cache.get(welcomeData.channel).send(attachment);
			});
			}
		}
	}
};
