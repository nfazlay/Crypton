/* Librarys that we will be using */
const discord = require("discord.js");
/* Prefix Model */
const prefixDb = require("../models/modelPrefix");
const disabledChannelDb = require("../models/modelDisableChannel");
/* Module exports to read from event handler */
module.exports = {
	name: "message",
	run: async (message, client) => {
		/* Get the data from the model */
		const prefixData = await prefixDb.findOne({
			guildId: message.guild.id,
		});
		/* Initialize the prefix variable */
		let prefix;
		/* Check if any data */
		if (prefixData) {
			/* If there is then get prefix from data */
			prefix = prefixData.prefix;
		} else if (!prefixData) {
			/* else get the default from .env */
			prefix = process.env.PREFIX;
		}
		/* Check if message starts with prefix */
		if (!message.content.startsWith(prefix) || message.author.bot) return;
		/* Get the argument and command's name from the message */
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();
		/* Get the command from the collection */
		const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		/* Check if command exists */
		if (!command) return;
		/* Check if command can run in channel */
		const disableData = disabledChannelDb.findOne({
			guildId: message.guild.id
		});
		if (disableData.disabledChannels.find(element => element === message.channel.id)) {
			return message.reply("This channel is disabled for all commands");
		}
		/* Cooldowns for commands */
		const cooldowns = new discord.Collection();
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new discord.Collection());
		}
		/* Get the current time the timestamp of the command and the cool down amount */
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;
		/* Check if timestamp has the id of the user */
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
			}
		}
		/* Set the timestamp */
		timestamps.set(message.author.id, now);
		/* Remove it after the specific time */
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		/* If channel is guild only and message is in dm dont execute the command */
		if (command.guildOnly && message.channel.type === "dm") {
			return message.reply("I can't execute that command inside DMs!");
		}
		/* If commands needs perms check if user has them */
		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply(`You need ${command.permissions.toLowerCase()} permission for this!`);
			}
		}
		/* If command needs arguments check if user gave them */
		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;
			/* If there is usage then provide it */
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}
			return message.channel.send(reply);
		}
		/* If everything is correct run the command and catch errors */
		try {
			command.run(message, args);
		} catch (error) {
			console.error(error);
		}
	},
};
