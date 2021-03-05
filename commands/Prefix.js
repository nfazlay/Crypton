const db = require("../models/modelPrefix");

module.exports = {
	name: "Prefix",
	description: "Change prefix for your server",
	guildOnly: true,
	permissions: "MANAGE_GUILD",
	args: true,
	usage: "<newPrefix>",
	run: async (message, args) => {
		const data = await db.findOne({
			guildId: message.guild.id
		});
		if (data) {
			data.prefix.unshift(args[0]);
			data.save();
		} else if (!data) {
			const newData = new db({
				prefix: args[0],
				guildId: message.guild.id
			});
			newData.save();
		}
		message.channel.send(`New prefix: ${args[0]}`);
	}
};