module.exports =
{
	name: "Roast",
	description: "haha roasted",
	cooldown: 2,
	run: async(message) => {
		const answers = ["Sup normie?", "Hey idiot", "whats up noob", "Did i ask?", "I dont care", "Another idiot", "The king of loosers", "BOOMER", "Novice", "Normie be like", "Sup edot"];
		const answer = answers[Math.floor(Math.random() * answers.length)];
		message.channel.send(answer);
	}
};