const discord = require("discord.js");
const welcomeDb = require("../../models/modelWelcoming");

module.exports = {
	name: "Welcoming",
	description: "Setup welcoming with crypton!",
	aliases: ["welcome-setup"],
	guildOnly: true,
	permissions: "MANAGE_GUILD",
	run: async (message) => {
		const filter = m => m.author.id === message.author.id;
		let roleToGive;
		let messageToSend;
		let channelToSend;
		const welcomeData = await welcomeDb.findOne({
			guildId: message.guild.id
		});

		const embed = new discord.MessageEmbed();
		embed.setTitle("Setup for welcoming!");
		embed.setDescription("What the role you want to give to users when they join?");
		embed.setFooter("You can either ping the role or send the id");
		embed.setTimestamp();
		embed.setColor("BLUE");

		message.channel.send(embed);

		const collector1 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });

		collector1.on("collect", m => {
			if (m.content.toLowerCase() === "cancel") {
				return message.channel.send("**Cancelled prompt.**");
			}

			if (!m.mentions.roles.first() && message.guild.roles.cache.get((m.content))) {
				roleToGive = m.content;
			} else if (m.mentions.roles.first()) {
				roleToGive = m.mentions.roles.first().id;
			} else {
				return message.channel.send("No role found!");
			}

			m.channel.send(`Role selected: ${m.guild.roles.cache.get(roleToGive).name}`);

			const msgEmbed = new discord.MessageEmbed();

			msgEmbed.setTitle("Setup for welcoming!");
			msgEmbed.setTimestamp();
			msgEmbed.setColor("BLUE");
			msgEmbed.setDescription("What should be the message sent when the user joins?");
			msgEmbed.addField("Usage", "{user} for the user's name\n {server} for server's name");
			message.channel.send(msgEmbed);

			const collector2 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
			collector2.on("collect", m => {
				if (m.content.toLowerCase() === "cancel") {
					return message.channel.send("**Cancelled prompt.**");
				}

				messageToSend = m.content;
				message.channel.send(`Message selected: ${m.content}`);

				embed.setTitle("Setup for welcoming!");
				embed.setTimestamp();
				embed.setColor("BLUE");
				embed.setDescription("What is the channel for the welcoming message");
				embed.setFooter("You can say id or mention it");

				message.channel.send(embed);

				const collector3 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });

				collector3.on("collect", m => {
					if (m.content.toLowerCase() === "cancel") {
						return message.channel.send("**Cancelled prompt.**");
					}
					let channel;

					if (!m.mentions.channels.first() && message.guild.channels.cache.get((m.content))) {
						channel = m.content;
					} else if (m.mentions.channels.first()) {
						channel = m.mentions.channels.first().id;
					} else {
						return message.channel.send("No channel found!");
					}
					m.channel.send(`Channel selected: ${m.guild.channels.cache.get(channel).name}`);
					channelToSend = channel;

					if (welcomeData) {
						welcomeData.role = roleToGive;
						welcomeData.message = messageToSend;
						welcomeData.channel = channelToSend;
						welcomeData.save();
					} else if (!welcomeData) {
						const newData = new welcomeDb({
							guildId: message.guild.id,
							role: roleToGive,
							message: messageToSend,
							channel: channelToSend,
						});
						newData.save();
					}
					message.channel.send("Setup has been completed, now I'll just send a message for safety after 3 seconds!");
					setTimeout(() => message.client.emit("guildMemberAdd", message.member), 3000);
				});
			});
		});
	}
};
