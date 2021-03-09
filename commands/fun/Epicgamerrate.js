module.exports =
{
	name: "Epicgamerrate",
	description: "Are you gamer?",
	cooldown: 2,
	run: async(message) => {
		const answer = Math.floor(Math.random() * 100);
		message.channel.send(`${message.author.username} is ${answer}% epicgamer :sunglasses:!`);
	}
};