const { ui } = require("../../json/defaults.json");

const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "loopqueue",
	description: "Loops The whole Queue",
	guildOnly: true,
	aliases: ["loopq", "loopque", "lq"],
	run: async (message, args) => {
		if (!args.length) {
			return message.reply("Mention `yes` or `No` as Argument");
		}
		const player = message.client.manager.get(message.guild.id);
		if (!player) {
			return message.reply("🙄There is No Music Playing around you");
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
		if (args[0] === "yes") {
			player.setQueueRepeat(true);
			const StartedLoopingQueueEmbed = new MessageEmbed()
				.setColor(ui.musicEmbedsColor)
				.setDescription("Looping The Whole Queue Now");
			return message.channel.send(StartedLoopingQueueEmbed);
		}
		if (args[0] === "no") {
			player.setQueueRepeat(false);
			const StoppedLoopingQueueEmbed = new MessageEmbed()
				.setColor(ui.musicEmbedsColor)
				.setDescription("Stopped Looping The Whole Queue");
			return message.channel.send(StoppedLoopingQueueEmbed);
		}
	},
};
