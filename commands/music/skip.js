const { MessageEmbed } = require("discord.js");
const { ui } = require("../../json/defaults.json");

module.exports = {
	name: "skip",
	description: "Skips the current song to next one",
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
		if (!player.queue.current) {
			const NoCurrentSongEmbed = new MessageEmbed()
				.setColor("RED")
				.setDescription("There are No Songs to skip, Play some songs First.");
			message.channel.send(NoCurrentSongEmbed);
			return;
		}
		if (!player.queue.size) {
			const NoQueueEmbed = new MessageEmbed()
				.setColor("RED")
				.setDescription("The Queue is Empty, play some songs First.");
			message.channel.send(NoQueueEmbed);
			return;
		}
		const { title, uri } = player.queue.current;

		await message.react("⏭️");
		player.stop();
		const SkippedEmbed = new MessageEmbed()
			.setColor(ui.musicEmbedsColor)
			.setDescription(`Skipped [${title}](${uri})`);
		return message.channel.send(SkippedEmbed);
	},
};
