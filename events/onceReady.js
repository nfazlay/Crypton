const { version } = require("../package.json");
module.exports = {
	name: "ready",
	once: true,
	run: (client) => {

		const randomStaus = () => {
			const statusArray = [
				{
					text: `:Help in ${client.guilds.cache.size} guilds with ${client.users.cache.size} users!`,
					type: "WATCHING",
				},
				{
					text: "Crypton Music",
					type: "LISTENING",
				},
				{
					text: `Version ${version}`,
					type: "PLAYING",
				},
			];
			const status = Math.floor(Math.random() * statusArray.length);
			client.user.setActivity(statusArray[status].text, {
				type: statusArray[status].type,
			});
		};
		setInterval(randomStaus, 30000);
		console.log(`Logged in as ${client.user.tag} with ${client.guilds.cache.size} guilds and ${client.users.cache.size} users!`);
	},
};
