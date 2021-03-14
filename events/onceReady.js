module.exports = {
	name: "ready",
	once: true,
	run: (client) => {
		console.log(`Logged in as ${client.user.tag}!`);
		client.user.setActivity(`:Help in ${client.guilds.cache.size} guilds with ${client.users.cache.size} users!`,
		{ type: "PLAYING", } );
	},
};
