const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
	name: "tweet",
	description: "tweet something on twitter!",
	run: async (message, args) => {
		fetch(
			`https://nekobot.xyz/api/imagegen?type=tweet&username=${
				message.author.username
			}&text=${args.join(" ")}`
		)
			.then((res) => res.json())
			.then((data) => {
				const embed = new MessageEmbed()
					.setTitle("Tweet!")
					.setImage(data.message)
					.setTimestamp();
				message.channel.send(embed);
			});
	},
};
