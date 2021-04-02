module.exports =
{
	name: "Roast",
	description: "haha roasted",
	cooldown: 2,
	run: async(message) => {
		const answers = ["Sup normie?", "Hey idiot", "whats up noob", "Did i ask?", "I dont care", "Another idiot", "The king of loosers", "BOOMER", "Novice", "Normie be like", "Sup edot", "Looks like there a noob in the room.", "Roast yourself, I'm tired"];
		const answer = answers[Math.floor(Math.random() * answers.length)];
		message.channel.send(answer);
	}
};