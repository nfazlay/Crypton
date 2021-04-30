const discord = require("discord.js");
const prefixDb = require("../../models/modelPrefix");

module.exports = {
	name: "Help",
	description: "List all of my commands or info about a specific command.",
	aliases: ["commands"],
	usage: "[command name]",
	cooldown: "5",
	run: async (message, args) => {
		const { commands } = message.client;
		const { categories } = message.client;
		const embed = new discord.MessageEmbed();
		const data = [];
		let prefix = process.env.PREFIX;
		const prefixData = await prefixDb.findOne({
			guildId: message.guild.id,
		});
		if (prefixData) {
			prefix = prefixData.prefix;
		}
		if (!args.length) {
			data.push(
				"Here's all my command categories:\n\n •" + categories.map(element => element.name[0].toUpperCase() + element.name.substring(1)).join("\n •")
			);
			embed.setDescription(`${data}\n\n
				**Note :** If you have any Doubts/Suggestions/Feedback Feel free to join our Support Server by [Clicking Here](https://discord.gg/fRVtnW8kY8)`)
				.setColor("#00ffff")
				.setAuthor("Crypton Help")
				.setThumbnail(message.client.user.displayAvatarURL())
				.setFooter(
					`You can use \`${prefix}Help [category]\` to get all commands of a category!`
				);
			return message.channel.send(embed);
		}
		let toFind = args[0].toLowerCase();

		if (categories.has(toFind)) {
			const commandsOfFolder = categories.get(toFind).Collection.map(element => `\`${element.name[0].toUpperCase() + element.name.substring(1)}\``).join(",");
			const CategoryEmbed = new discord.MessageEmbed()
				.setTitle(toFind[0].toUpperCase() + toFind.substring(1))
				.setDescription(commandsOfFolder)
				.setTimestamp()
				.setFooter(
					`Requested by: ${message.author.username}`,
					message.author.displayAvatarURL()
				);

			return message.channel.send(CategoryEmbed);
		}
		toFind = toFind.toLowerCase();

		const command =
			commands.get(toFind) ||
			commands.find((c) => c.aliases && c.aliases.includes(toFind));

		if (!command) {
			return message
				.reply("woops! that's not a command or a category")
				.then((msg) => msg.delete({ timeout: 5000 }));
		}
		embed
			.setColor("#00ffff")
			.setAuthor("Crypton Help")
			.setThumbnail(message.client.user.displayAvatarURL());
		if (command.name) {
			embed.addField("Name", command.name, true);
		}
		if (command.aliases) {
			embed.addField("Aliases", command.aliases, true);
		}
		if (command.description) {
			embed.addField("Description", command.description, true);
		}
		if (command.args) {
			embed.addField("Args required", "Yes", true);
		}
		if (command.cooldown) {
			embed.addField("Cooldown", command.cooldown, true);
		}
		if (command.usage) {
			embed.addField("Usage", `${prefix}${command.name} ${command.usage}`, true);
		}
		if (command.guildOnly) {
			embed.addField("GuildOnly", "Yes", true);
		}
		if (command.permissions) {
			embed.addField("Permissions", command.permissions, true);
		}
		message.channel.send(embed);
	}
};
