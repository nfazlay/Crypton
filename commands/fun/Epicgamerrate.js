module.exports =
{
	name: "Epicgamerrate",
	description: "Are you gamer?",
	cooldown: 2,
	run: async(message) => {
		const user = message.author.username;
		const userMention = message.mentions.members.first();
		const answer = Math.floor(Math.random() * 100);
		if (userMention) {
			message.channel.send(`${userMention.user.username} is ${answer}%  Epicgamer :sunglasses:!`);
		}else if (user) {
			message.channel.send(`You are ${answer}% Epicgamer :sunglasses:!`);

		}
	}
};
