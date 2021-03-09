const disableDb = require("../../models/modelDisabled");

module.exports =
{
	name: "EnableChannel",
	description: "Enable a channel!",
	args: true,
	usage: "#ChannelMention",
	guildOnly: true,
	permissions: "MANAGE_GUILD",
	run: async(message) => {
		const toEnable = message.mentions.channels.first();

        if (!toEnable) {
            message.reply("No channel found").then(msg => msg.delete({ timeout: 3000 }));
        }

        const data = await disableDb.findOne({
			guildId: message.guild.id
		});
		if (data) {
			const position = data.disabledChannels.indexOf(toEnable.id);
			data.disabledChannels.splice(position, 1);
			data.save();
		}
		message.channel.send(`The bot will accept commands in ${toEnable}`);
	}
};
