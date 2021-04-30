const { MessageEmbed } = require("discord.js");
const { ui } = require("../../json/defaults.json");

module.exports = {
	name: "stop",
	description: "Stops Playing music",
	guildOnly: true,
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

		await message.react("🛑");
		player.destroy();
		const StopedEmbed = new MessageEmbed()
			.setColor(ui.musicEmbedsColor)
			.setDescription("Stopped playing music");
		return message.channel.send(StopedEmbed);
	},
};
