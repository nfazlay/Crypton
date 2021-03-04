/* Librarys that we will be using */
const discord = require("discord.js");
const fs = require("fs");
/* The client object */
const client = new discord.Client();
/* Commands and categories */
client.commands = new discord.Collection();
client.categories = new discord.Collection();
/* Go through each folder and command and add them to the collection */
const folders = fs.readdirSync("./commands");
for (const folder of folders) {
	client.categories.push(folder.toLowerCase());
	const commands = fs.readdirSync(`./commands/${folder}`);
	for (const commandFile of commands) {
		const command = require(`./commands/${folder}/${commandFile}`);
		client.commands.set(command.name.toLowerCase(), command);
	}
}
/* Go through each event file and add them */
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const eventFile of eventFiles) {
	const event = require(`./events/${eventFile}`);
	if (event.once) {
		client.once(event.name, (...args) => event.run(...args, client));
	} else {
		client.on(event.name, (...args) => event.run(...args));
	}
}
/* Log-in the client using super secret token */
client.login(process.env.token);