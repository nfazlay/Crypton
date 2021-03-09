module.exports = {
	name: "Flip",
	description: "Flip a coin!",
	cooldown: "2",
	run: async(message) => {
		const random = Math.floor(Math.random() * 2);

		if (random === 1) {
			message.channel.send("Coin landed on tails");
		} else {
			message.channel.send("Coin landed on heads");
		}
	}
};