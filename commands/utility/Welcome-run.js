module.exports =
{
	name: "WelcomeRun",
    description: "Test if welcoming works for your server",
    aliases: ["Welcomer-run", "welcome-test"],
	cooldown: 3,
	run: async(message) => {
        message.channel.send("Welcomer is starting!");
        message.client.emit("guildMemberAdd", message.member);
	}
};