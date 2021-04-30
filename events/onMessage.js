/* Librarys that we will be using */
const discord = require("discord.js");
/* Prefix Model */
const prefixDb = require("../models/modelPrefix");
const rankingDb = require("../models/modelRanking");
const disabledDb = require("../models/modelDisabled");
/* Cooldowns */
const chatCooldown = new discord.Collection();
const cooldowns = new discord.Collection();
/* Module exports to read from event handler */
module.exports = {
	name: "message",
	run: async (message, client) => {
		/* Check if message was sent by bot */
		if (message.author.bot) return;

		/* Get the disabled info data */
		const disableData = await disabledDb.findOne({
			guildId: message.guild.id,
		});
		/* Get the Prefix data from the model */
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
			if (process.env.PREFIX) {
				prefix = process.env.PREFIX;
			} else if (!process.env.PREFIX) {
				console.error(
					"Prefix not found in .env file bot may not run in the server"
				);
			}
		}
		/* mention as a prefix */
		const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const prefixRegex = new RegExp(
			`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
		);

		/* Check if word is banned if it is then delete */
		if (
			disableData &&
      disableData.disabledWords &&
      !message.member.hasPermission("MANAGE_GUILD")
		) {
			for (let i = 0; i < disableData.disabledWords.length; i++) {
				const element = disableData.disabledWords[i];
				for (
					let index = 0;
					index < message.content.split(/ +/).length;
					index++
				) {
					const word = message.content.split(/ +/)[index];
					if (
						word.toLowerCase().includes(element.toLowerCase()) &&
            !message.content.toLowerCase().startsWith(`${prefix}unblacklist`) &&
            !message.channel.permissionsFor(message.author).has("MANAGE_GUILD")
					) {
						message.channel
							.send("You can't use that word here!")
							.then((msg) => msg.delete({ timeout: 5000 }));
						message.delete();
						return;
					}
				}
			}
		}
		/* Check if message doesn't starts with prefix */
		let matchedPrefix;
		try {
			const [, mp] = message.content.match(prefixRegex);
			if (mp) {
				matchedPrefix = mp;
			}
		} catch (e) {
			null;
		}

		if (!prefixRegex.test(message.content)) {
			if (disableData && disableData.disabledCategories) {
				if (
					disableData.disabledCategories.find(
						(element) => element === "leveling"
					)
				) {
					return;
				}
			}

			if (!chatCooldown.has(message.author.id)) {
				chatCooldown.set(message.author.id, new discord.Collection());
			}

			const now = Date.now();
			const timestamps = chatCooldown.get(message.author.id);
			const cooldownAmount = 60000;

			if (timestamps.has(message.author.id)) {
				const expirationTime =
          timestamps.get(message.author.id) + cooldownAmount;

				if (now < expirationTime) {
					return;
				}
			}

			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

			const data = await rankingDb.findOne({
				guildId: message.guild.id,
				userId: message.author.id,
			});

			const xpToAdd = Math.floor(Math.random() * (25 - 15 + 1)) + 15;

			if (data) {
				data.xp += xpToAdd;
				if (data.xp >= (data.lvl + 1) * 200) {
					data.xp -= (data.lvl + 1) * 200;
					data.lvl += 1;
					message.channel.send(
						`Congrats <@${message.author.id}> you reached level ${data.lvl}!`
					);
				}
				data.save();
			} else if (!data) {
				const newData = new rankingDb({
					guildId: message.guild.id,
					userId: message.author.id,
					xp: 0,
					lvl: 1,
				});
				newData.xp += xpToAdd;
				newData.save();
			}
			return;
		}
		/* Get the argument and command's name from the message */
		const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();
		/* Get the command from the collection */
		const command =
		client.commands.get(commandName) ||
		client.commands.find(
			(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
		);
		/* Check if command exists */
		if (!command) return;

		if (commandName === `<@${message.client.user.tag}>` || commandName === `<!@${message.client.user.tag}>`) {
			const mentionEmbed = new discord.MessageEmbed()
				.setAuthor("Crypton")
				.setDescription(`The Prefix For this Server is ${prefix},\nYou can use ${prefix}help to get the list of all commands.`)
				.setColor(3092790)
				.setTimestamp();
			return message.channel.send(mentionEmbed);
		}
		/* Check if command can run in channel */
		if (disableData && disableData.disabledChannels) {
			if (
				disableData.disabledChannels.find(
					(element) => element === message.channel.id
				)
			) {
				return message.reply("This channel is disabled for all commands");
			}
		}
		/* Cooldowns for commands */
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
				return message.reply(
					`Please wait ${timeLeft.toFixed(
						1
					)} more second(s) before reusing the \`${command.name}\` command.`
				);
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
				return message.reply(
					`You need ${command.permissions.toLowerCase()} permission for this!`
				);
			}
		}
		if (command.requiresDb) {
			if (!process.env.MONGO_CONNECTION_URL) {
				message.channel.send(
					"Database connection has not been setted up, please contact the bot owner if the problem ouccurs again"
				);
				console.error(
					"Mongo db compass url was not found in .env file make sure you have a compass URL"
				);
			}
		}
		if (command.devOnly) {
			if (message.author.bot) return;
			const developers = [];
			client.fetchApplication().then((data) => {
				if (data.owner.id) {
					developers.push(data.owner.id);
				} else if (!data.owner.id) {
					data.owner.members.forEach((member) => {
						developers.push(member.id);
					});
				}
			});
			if (!developers.find((element) => element === message.author.id)) {
				return;
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
			command.run(message, args, prefix);
		} catch (error) {
			message.channel.send("An error occured!");
		}
	},
};
