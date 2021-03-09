const discord = require("discord.js");

module.exports = {
	name: "Announce",
	description: "Announcement ahead!",
	aliases: ["announcement"],
	permissions: "MANAGE_GUILD",
	run: async (message) => {
		const filter = m => m.author.id === message.author.id;

		message.channel.send("Which channel do you want the announcement to be in?");

		const collector1 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
		collector1.on("collect", msg => {
			let channel;
			if (msg.mentions.channels.first() || message.guild.channels.cache.get(msg.content)) {
				channel = msg.mentions.channels.first().id || message.guild.channels.cache.get(msg.content).id;

				message.channel.send(`Selected channel: ${message.guild.channels.cache.get(channel).name}`);
			} else if (msg.content.toLowerCase() === "cancel") {
				return message.channel.send("Cancelled.");
			} else {
				return message.channel.send("No channel found");
			}

			message.channel.send("What should be the title for the message?");

			const collector2 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
			collector2.on("collect", msg => {

				if (msg.content.toLowerCase() === "cancel") {
					return message.channel.send("Cancelled.");
				}
				const title = msg.content;

				message.channel.send("What should be the content in message");

				const collector3 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
				collector3.on("collect", msg => {
					if (msg.content.toLowerCase() === "cancel") {
						return message.channel.send("Cancelled.");
					}
					const description = msg.content;

					message.channel.send("What should be the footer (down text) of announcement?");

					const collector4 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
					collector4.on("collect", msg => {
						if (msg.content.toLowerCase() === "cancel") {
							return message.channel.send("Cancelled.");
						}
						const footer = msg.content;

						message.channel.send("Do you want to send the announcement?");

						const collector5 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
						collector5.on("collect", msg => {
							if (msg.content.toLowerCase() === ("no" || "cancel")) {
								return message.channel.send("Cancelled.");
							}
							const embed = new discord.MessageEmbed();
							embed.setTitle(title);
							embed.setDescription(description);
							embed.setFooter(footer);
							embed.setTimestamp();
							embed.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }));
							embed.setColor("BLUE");
							embed.setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }));

							message.guild.channels.cache.get(channel).send(embed);
						});
					});
				});
			});
		});
	}
};
