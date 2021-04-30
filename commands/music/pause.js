const { MessageEmbed } = require("discord.js");
const { ui } = require("../../json/defaults.json");

module.exports = {
	name: "pause",
	description: "Pauses The playing Song",
	guildOnly: true,
	aliases: ["pse", "hold"],
	run: async (message) => {
		const player = message.client.manager.get(message.guild.id);
		if (!player) {
			message.reply("There is no song playing!");
			return;
		}

		const { channel } = message.member.voice;
		if (!channel) {
			const NotInVoiceChannelEmbed = new MessageEmbed()
				.setColor("RED")
				.setDescription("You have to join Voice Channel to Run this Command");
			message.channel.send(NotInVoiceChannelEmbed);
			return;
		}
		if (channel.id !== player.voiceChannel) {
			const NotInSameVoiceChannelEmbed = new MessageEmbed()
				.setColor("RED")
				.setDescription("You are not in the same voice channel!");
			message.channel.send(NotInSameVoiceChannelEmbed);
			return;
		}
		if (player.paused) {
			const alreadyPausedEmbed = new MessageEmbed()
				.setColor("RED")
				.setDescription("Music is Already Paused");
			message.channel.send(alreadyPausedEmbed);
			return;
		}
		await message.react("⏸️");
		player.pause(true);
		const PausedEmbed = new MessageEmbed()
			.setColor(ui.musicEmbedsColor)
			.setDescription("Music Has Been Paused!");
		return message.channel.send(PausedEmbed);
	},
};
