const discord = require("discord.js");

module.exports = {
	name: "Announce",
	description: "Announcement ahead!",
	aliases: ["announcement"],
	permissions: "MANAGE_GUILD",
	run: async (message) => {
		const filter = m => m.author.id === message.author.id;

		const embed = new discord.MessageEmbed();
		embed.setDescription("Which channel do you want the announcement to be in?");
		embed.setFooter("You can mention the channel or send the id");
		embed.setTimestamp();
		embed.setColor("BLUE");
		message.channel.send(embed);

		const collector1 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
		collector1.on("collect", msg => {
			let channel;
			if (msg.mentions.channels.first() || message.guild.channels.cache.get(msg.content)) {
				channel = msg.mentions.channels.first().id || message.guild.channels.cache.get(msg.content).id;

				message.channel.send(`Selected channel: ${message.guild.channels.cache.get(channel).name}`);
			} else if (msg.content.toLowerCase() === "cancel") {
				return message.channel.send("Cancelled.");
			} else {
				return message.channel.send("Sorry no channel with the ID was found!");
			}

			embed.setDescription("What should be the title for the message?");
			message.channel.send(embed);

			const collector2 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
			collector2.on("collect", msg => {

				if (msg.content.toLowerCase() === "cancel") {
					return message.channel.send("Cancelled.");
				}
				const title = msg.content;

				embed.setDescription("What should be the content in message");
				message.channel.send(embed);

				const collector3 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
				collector3.on("collect", msg => {
					if (msg.content.toLowerCase() === "cancel") {
						return message.channel.send("Cancelled.");
					}
					const description = msg.content;

					embed.setDescription("What should be the footer (down text) of announcement?");
					message.channel.send(embed);

					const collector4 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
					collector4.on("collect", msg => {
						if (msg.content.toLowerCase() === "cancel") {
							return message.channel.send("Cancelled.");
						}
						const footer = msg.content;

						embed.setDescription("Would you like to mention everyone?");
						embed.setFooter("You can say yes or no (not case sensitive)");
						message.channel.send(embed);

						const collector5 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
						collector5.on("collect", msg => {

							embed.setTitle(title);
							embed.setDescription(description);
							embed.setFooter(footer);
							embed.setTimestamp();
							embed.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }));
							embed.setColor("BLUE");
							embed.setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }));

							if (msg.content.toLowerCase() === "no") {
								message.guild.channels.cache.get(channel).send(embed);
							} else {
								message.guild.channels.cache.get(channel).send("@everyone", { embed });
							}
						});
					});
				});
			});
		});
	}
};
