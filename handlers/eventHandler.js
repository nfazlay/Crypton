const fs = require("fs");

function config(client) {
/* Go through each event file and add them */
	const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));
	for (const eventFile of eventFiles) {
		const event = require(`../events/${eventFile}`);
		if (event.once) {
			client.once(event.name, (...args) => event.run(...args, client));
		} else {
			client.on(event.name, (...args) => event.run(...args, client));
		}
	}
}

module.exports.config = config;
