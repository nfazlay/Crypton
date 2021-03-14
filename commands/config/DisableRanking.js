const rankingDb = require("../../models/modelDisabled");

module.exports =
{
	name: "DisableRanking",
	description: "Disable ranking for your server!",
	guildOnly: true,
	permissions: "MANAGE_GUILD",
	run: async(message) => {

        const data = await rankingDb.findOne({
			guildId: message.guild.id
		});

		if (data) {
			data.disabledSpecials.unshift({
                Ranking: true,
            });
			data.save();
		} else if (!data) {
			const newData = new rankingDb ({
				guildId: message.guild.id,
				disabledChannels: [],
				disabledSpecials: [{
					Ranking: true,
				}, ],
			});
			newData.save();
		}
		message.channel.send("Ranking has been disabled!");
	}
};
