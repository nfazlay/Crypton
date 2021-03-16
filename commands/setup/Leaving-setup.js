const discord = require("discord.js");
const leavingDb = require("../../models/modelLeaving");

module.exports = {
	name: "Leaving",
	description: "Setup leaving messages with crypton!",
	aliases: ["Leaver-setup"],
	guildOnly: true,
	permissions: "MANAGE_GUILD",
	run: async (message) => {

		const filter = m => m.author.id === message.author.id;
		let messageToSend;
		let channelToSend;

		const leavingData = await leavingDb.findOne({
			guildId: message.guild.id
		});

			const msgEmbed = new discord.MessageEmbed();
			msgEmbed.setTitle("Setup for welcoming!");
			msgEmbed.setTimestamp();
			msgEmbed.setColor("BLUE");
			msgEmbed.setDescription("What should be the message sent when the user leaves?");
			msgEmbed.addField("How to use", "{user} for the user's name\n {server} for server's name");
			message.channel.send(msgEmbed);

			const collector1 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
			collector1.on("collect", m => {
				if (m.content.toLowerCase() === "cancel") {
					return message.channel.send("**Cancelled prompt.**");
				}

				messageToSend = m.content;
				message.channel.send(`Message selected: ${m.content}`);

				const channelEmbed = new discord.MessageEmbed();
				channelEmbed.setTitle("Setup for Leaving message!");
				channelEmbed.setTimestamp();
				channelEmbed.setColor("BLUE");
				channelEmbed.setDescription("What is the channel for the leaving messages");
				channelEmbed.setFooter("You can say the id or mention it");
				message.channel.send(channelEmbed);

				const collector2 = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
				collector2.on("collect", m => {
					if (m.content.toLowerCase() === "cancel") {
						return message.channel.send("**Cancelled prompt.**");
					}

					if (!m.mentions.channels.first() && message.guild.channels.cache.get((m.content))) {
						channelToSend = m.content;
					} else if (m.mentions.channels.first()) {
						channelToSend = m.mentions.channels.first().id;
					} else {
						return message.channel.send("Sorry, no channel was found, please try again later!");
					}
					m.channel.send(`Channel selected: ${m.guild.channels.cache.get(channelToSend).name}`);

					if (leavingData) {
						leavingData.message = messageToSend;
						leavingData.channel = channelToSend;
						leavingData.save();
					} else if (!leavingData) {
						const newData = new leavingDb({
							guildId: message.guild.id,
							message: messageToSend,
							channel: channelToSend,
						});
						newData.save();
					}
					message.channel.send("Setup has been completed, now I'll just send a message for safety after 3 seconds!");
					setTimeout(() => message.client.emit("guildMemberRemove", message.member), 3000);
				});
			});

	}
};
