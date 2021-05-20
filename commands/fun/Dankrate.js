module.exports =
{
	name: "Dankrate",
	description: "Are you dank?",
	cooldown: 2,
	run: async(message) => {
		//const men = message.mentions.users.first() || message.author.username;
		const user = message.author.username;
		const userMention = message.mentions.members.first();
		const answer = Math.floor(Math.random() * 100);
		if (userMention) {
			message.channel.send(`${userMention.user.username} is ${answer}% Dank!`);
		}else if (user) {
			message.channel.send(`You are ${answer}% Dank!`);

		}
	}
};