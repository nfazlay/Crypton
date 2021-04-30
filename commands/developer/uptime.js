const ms = require("ms");
module.exports = {
	name: "uptime",
	devOnly: true,
	run: (message) => {
		message.reply(ms(message.client.uptime, { long: true }));
	},
};
