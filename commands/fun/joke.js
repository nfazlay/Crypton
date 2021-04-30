const { MessageEmbed } = require("discord.js");
const axios = require("axios");
module.exports = {
	name: "joke",
	description: "Spawns a Random joke",
	run: async (message) => {
		const jokeURI = "https://official-joke-api.appspot.com/random_joke";
		const { data } = await axios.get(jokeURI);
		const jokeEmbed = new MessageEmbed()
			.setColor("#2DDBE2")
			.setAuthor("Crypton Joke")
			.setFooter(`Req. by ${message.author.tag}`)
			.setDescription(`${data.setup} \n\n ${data.punchline}`);
		return message.channel.send(jokeEmbed);
	},
};
