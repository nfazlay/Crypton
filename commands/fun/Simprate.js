module.exports =
{
	name: "Simprate",
	description: "Are you simp?",
	cooldown: 2,
	run: async(message) => {
		const answer = Math.floor(Math.random() * 100);
		message.channel.send(`${message.author.username} is ${answer}% simp!`);
	}
};