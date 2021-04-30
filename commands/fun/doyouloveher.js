module.exports = {
	name: "loverate",
	description: "Are you simp?",
	cooldown: 2,
	run: async (message) => {
		const men = message.mentions.users.first();
		const answer = Math.floor(Math.random() * 100);
		message.channel.send(
			`${message.author.username}'s Love towards ${men} is ${answer}% true!`
		);
	},
};
