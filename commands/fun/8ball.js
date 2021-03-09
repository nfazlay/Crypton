module.exports =
{
	name: "8ball",
	description: "Random decision... or is it?",
	cooldown: 2,
	run: async(message) => {
		const answers = ["Absolutely", "LOL no", "Maybe", "Sure", "I mean yes-", "Absolutely no", "Are you crazy? no right?", "Is sun yellow? yes right?", "Is moon black? NO!"];
		const answer = answers[Math.floor(Math.random() * answers.length)];
		message.channel.send(answer);
	}
};