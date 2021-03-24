const disableDb = require("../../models/modelDisabled");

module.exports =
{
	name: "Unblackist",
	description: "Unblacklist a word so people can say it",
	guildOnly: true,
	permissions: "MANAGE_GUILD",
	requiresDb: true,
	run: async(message, args) => {

    const data = await disableDb.findOne({
			guildId: message.guild.id
		});

		args.forEach(element => {
			if (data) {
				const position = data.disabledChannels.indexOf(element);
				data.disabledChannels.splice(position, 1);
				data.save();
			}
		});
		message.channel.send(`${args} Unblacklisted`);
	}
};
