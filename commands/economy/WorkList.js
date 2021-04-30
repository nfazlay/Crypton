const economyDb = require("../../models/modelEconomy");
const discord = require("discord.js");
const workListJson = require("../../json/worklist.json");
const defaultJson = require("../../json/defaults.json");

module.exports = {
	name: "Works",
	aliases: ["worklist"],
	description: "Work to earn money!",
	cooldown: "3",
	run: async (message) => {

		const economyData = await economyDb.findOne({
			userId: message.author.id,
		});

		const embed = new discord.MessageEmbed()
			.setTitle("Jobs Availiable")
			.setColor("BLUE")
			.setTimestamp()
			.setAuthor("Crypton Hirer")
			.setFooter("Reply with the job name you want");

		const workList = [];
		for (const key in workListJson) {
			workList.push(key);
			const level = economyData.level || defaultJson["defaultLevel"];
			if (level >= workListJson[key]) {
				embed.addField(`:green_square: ${key}`, `Level: ${workListJson[key]}`);
			} else if (level < workListJson[key]) {
				embed.addField(`:red_square: ${key}`, `Level: ${workListJson[key]}`);
			}
		}
		message.channel.send(embed);

		const filter = m => m.author.id === message.author.id;
		const collector = message.channel.createMessageCollector(filter, { max: "1", maxMatches: "1", time: "200000", errors: ["time"] });
		collector.on("collect", msg => {
			const jobDecided = msg.content.toLowerCase()[0].toUpperCase() + msg.content.toLowerCase().substring(1);
			if (workList.includes(jobDecided)) {
				const jobLevel = workListJson[jobDecided];
				if (economyData) {
					if (economyData.level >= jobLevel) {
						economyData.workingAs = jobDecided;
						economyData.save();
						return message.channel.send(`Congrats your now working as ${jobDecided}`);
					} else if (economyData.level < jobLevel) {
						return message.channel.send(`You must be level ${jobLevel} to work as ${jobDecided}`);
					}
				} else if (!economyData) {
					const newData = new economyDb({
						userId: message.author.id,
						cash: defaultJson["defaultCashOnStart"],
						level: defaultJson["defaultLevel"],
					});
					if (newData.level >= jobLevel) {
						newData.workingAs = jobDecided;
						message.channel.send(`Congrats your now working as ${jobDecided}`);
					} else if (newData.level < jobLevel) {
						message.channel.send(`You must be level ${jobLevel} to work as ${jobDecided}`);
					}
					newData.save();
				}
			} else if (!workList.includes(jobDecided)) {
				return message.channel.send("No Job was found with that name?");
			}
		});
	}
};