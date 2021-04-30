const blacklistDb = require("../../models/modelDisabled");

module.exports =
{
	name: "Blacklist",
	description: "Stop everyone from saying a word or two or three or..",
	args: true,
	usage: "<Word> or <Word1> <Word2> <Word3>",
	guildOnly: true,
	requiresDb: true,
	permissions: "MANAGE_GUILD",
	run: async(message, args) => {

		const data = await blacklistDb.findOne({
			guildId: message.guild.id
		});

		args.forEach(element => {
			if (data) {
				data.disabledWords.push(element);
				data.save();
			} else if (!data) {
				const newData = new blacklistDb ({
					guildId: message.guild.id,
					disabledChannels: [],
					disabledSpecials: [{
						Ranking: true,
					}, ],
					disabledWords: [element]
				});
				newData.save();
			}
		});
		message.channel.send(`**\`${args}\` blacklisted!**`);
	}
};
