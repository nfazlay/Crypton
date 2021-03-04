module.exports = {
	name: "message",
	run: (message) => {
		console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
	},
};