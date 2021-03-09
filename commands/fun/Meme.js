const discord = require("discord.js");
const axios = require("axios");

module.exports = {
	name: "Meme",
	description: "I have some great meme run the command!",
	cooldown: "2",
	run: async (message) => {
		axios.get("https://meme-api.herokuapp.com/gimme").then((res) => {
			const { data } = res;
			const memeEmbed = new discord.MessageEmbed()
				.setAuthor("Crypton Meme")
				.setColor("RANDOM")
				.setTitle(data.title)
				.setDescription(`[Post link](${data.postLink}) | Reddit`)
				.setImage(data.url)
				.setFooter(`Post by u/${data.author}`);
			message.channel.send(memeEmbed);
		});
	},
};
