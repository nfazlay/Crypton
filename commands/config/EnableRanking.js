const rankingDb = require("../../models/modelDisabled");

module.exports =
{
	name: "EnableRanking",
	description: "Enable ranking for your server!",
	guildOnly: true,
	permissions: "MANAGE_GUILD",
	requiresDb: true,
	run: async(message) => {

        const data = await rankingDb.findOne({
			guildId: message.guild.id
		});

		if (data) {
			const position = data.disabledSpecials.indexOf("Ranking");
			data.disabledSpecials.splice(position, 1);
			data.save();
		}
		message.channel.send("Ranking has been enabled!");
	}
};
