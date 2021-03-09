const discord = require("discord.js");

module.exports =
{
	name: "Invite",
	description: "Invite me in your other servers too!",
	cooldown: 3,
	run: async(message) => {
		const embed = new discord.MessageEmbed();
		embed.setTitle("Invite me!");
		embed.setURL("https://discord.com/api/oauth2/authorize?client_id=804588003791208478&permissions=8&scope=bot");
		embed.setImage("https://media.discordapp.net/attachments/797061280694272035/808916980199194644/Button.png");

		message.channel.send(embed);
	}
};