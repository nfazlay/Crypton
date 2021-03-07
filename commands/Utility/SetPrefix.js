const prefixDb = require("../../models/modelPrefix");

module.exports = {
	name: "SetPrefix",
	description: "Change prefix for your server",
	guildOnly: true,
	permissions: "MANAGE_GUILD",
	args: true,
	usage: "<newPrefix>",
	run: async (message, args) => {
		const data = await prefixDb.findOne({
			guildId: message.guild.id
		});
		if (data) {
			data.prefix = args[0];
			data.save();
		} else if (!data) {
			const newData = new prefixDb({
				prefix: args[0],
				guildId: message.guild.id
			});
			newData.save();
		}
		message.channel.send(`New prefix: ${args[0]}`);
	}
};
