module.exports = {
	name: "Say",
	description: "Say something in the channel you write this command",
	aliases: ["speak"],
	args: true,
	usage: "#ChannelMention [optional] message",
	permissions: "MANAGE_MESSAGES",
	run: async (message, args) => {
		const channel = message.mentions.channels.first() || message.channel;
		message.guild.channels.cache.get(channel.id).send(args.join(" "));
		message.delete();
	}
};