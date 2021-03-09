const disableDb = require("../../models/modelDisabled");

module.exports =
{
	name: "DisableChannel",
	description: "Disable a channel!",
	args: true,
	usage: "#ChannelMention",
	guildOnly: true,
	permissions: "MANAGE_GUILD",
	run: async(message) => {
		const toDisable = message.mentions.channels.first();

        if (!toDisable) {
            message.reply("No channel found").then(msg => msg.delete({ timeout: 3000 }));
        }

        const data = await disableDb.findOne({
			guildId: message.guild.id
		});
		if (data) {
			data.disabledChannels.unshift({
                channelId: toDisable.id,
            });
			data.save();
		} else if (!data) {
			const newData = new disableDb({
				guildId: message.guild.id,
				disabledChannels: [{
					channelId: toDisable.id,
				}, ],
				disabledSpecials: [],
			});
			newData.save();
		}
		message.channel.send(`The bot will not run in ${toDisable}`);
	}
};
