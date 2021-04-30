const { MessageEmbed } = require("discord.js");
// const { Canvas } = require("canvacord");
const fetch = require("node-fetch");

module.exports = {
	name: "trap",
	run: async (message) => {
		const user = message.mentions.users.first();
		const avatar = user.displayAvatarURL({ format: "png" });
		fetch(
			`https://nekobot.xyz/api/imagegen?type=trap&name=${user.username}&author=${message.author.username}&image=${avatar}`
		)
			.then((res) => res.json())
			.then((data) => {
				const trpImage = new MessageEmbed().setImage(data.message);

				message.channel.send(trpImage);
			});
	},
};
