const disableDb = require("../../models/modelDisabled");

module.exports = {
	name: "Disable",
	description: "Disable something",
	args: true,
	usage: "#ChannelMention",
	guildOnly: true,
	requiresDb: true,
	permissions: "MANAGE_GUILD",
	run: async(message, args) => {
		if (message.mentions.channels.first()) {
			const channel = message.mentions.channels.first();
			const data = await disableDb.findOne({
				guildId: message.guild.id
			});
			if (data) {
				data.disabledChannels.unshift(
					channel.id
				);
				data.save();
				return message.channel.send(`The bot will not run in ${channel}`);
			} else if (!data) {
				const newData = new disableDb({
					guildId: message.guild.id,
					disabledChannels: [
						channel.id
					],
				});
				newData.save();
				return message.channel.send(`The bot will not run in ${channel}`);
			}
		}
		if (message.client.categories.get(args[0].toLowerCase())) {
			const data = await disableDb.findOne({
				guildId: message.guild.id
			});
			if (data) {
				data.disabledCategories.unshift(
					args[0].toLowerCase()
				);
				data.save();
				return message.channel.send(`${args[0]} has been disabled!`);
			} else if (!data) {
				const newData = new disableDb({
					guildId: message.guild.id,
					disabledCategories: [
						args[0].toLowerCase()
					],
				});
				newData.save();
				return message.channel.send(`${args[0]} has been disabled!`);
			}
		}
		if (message.client.commands.get(args[0].toLowerCase())) {
			const data = await disableDb.findOne({
				guildId: message.guild.id
			});
			if (data) {
				data.disabledCommands.unshift(
					args[0].toLowerCase()
				);
				data.save();
				return message.channel.send(`${args[0]} has been disabled!`);
			} else if (!data) {
				const newData = new disableDb({
					guildId: message.guild.id,
					disabledCommands: [
						args[0].toLowerCase()
					],
				});
				newData.save();
				return message.channel.send(`${args[0]} has been disabled!`);
			}
		} else {
			return message.channel.send(`${args[0] || "The required object"} was not found if this cotinues contact support`);
		}
	}
};
