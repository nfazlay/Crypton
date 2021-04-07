const disableDb = require("../../models/modelDisabled");

module.exports =
{
	name: "Enable",
	description: "Enable something",
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
					const position = data.disabledChannels.indexOf(channel.id);
					data.disabledChannels.splice(position, 1);
					data.save();
        }
        return message.channel.send(`The bot will run in ${channel}`);
      }
      if (message.client.categories.get(args[0].toLowerCase())) {
        const data = await disableDb.findOne({
          guildId: message.guild.id
        });
        if (data) {
					const position = data.disabledChannels.indexOf(args[0].toLowerCase());
					data.disabledChannels.splice(position, 1);
					data.save();
					return message.channel.send(`${args[0]} has been enabled!`);
        }
	}
      if (message.client.commands.get(args[0].toLowerCase())) {
        const data = await disableDb.findOne({
          guildId: message.guild.id
        });
        if (data) {
					const position = data.disabledChannels.indexOf(args[0]);
					data.disabledChannels.splice(position, 1);
					data.save();
					return message.channel.send(`${args[0]} has been enabled!`);
        }
      } else {
				return message.channel.send(`${args[0] || "The required object"} was not found if this cotinues contact support`);
			}
    }
};
