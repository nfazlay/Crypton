module.exports =
{
	name: "Grenify",
	description: "Green text, psst its css",
	cooldown: 2,
	args: true,
	usage: "Text",
	run: async(message, args) => {
		const answer = args.join(" ");
		message.channel.send(`\`\`\`css\n ${answer}\`\`\``);
	}
};