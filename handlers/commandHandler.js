const discord = require("discord.js");
const fs = require("fs");

function config(client) {
	/* Commands and categories */
	client.commands = new discord.Collection();
	client.categories = new discord.Collection();
	/* Go through each folder and command and add them to the collection */
	const folders = fs.readdirSync("./commands");
	for (const folder of folders) {
		client.categories.set(folder.toLowerCase(), {
			name: folder.toLowerCase(), Collection: new discord.Collection() });
		const commands = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
		for (const commandFile of commands) {
			const command = require(`../commands/${folder}/${commandFile}`);
			client.commands.set(command.name.toLowerCase(), command);
			client.categories.get(folder.toLowerCase()).Collection.set(command.name.toLowerCase(), command);
		}
	}
}

module.exports.config = config;
