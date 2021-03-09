module.exports =
{
	name: "Dankrate",
	description: "Are you dank?",
	cooldown: 2,
	run: async(message) => {
		const answer = Math.floor(Math.random() * 100);
		message.channel.send(`${message.author.username} is ${answer}% Dank!`);
	}
};