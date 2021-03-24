const discord = require("discord.js");
const rankingDb = require("../../models/modelRanking");
const { Rank } = require("canvacord");

module.exports = {
        name: "Rank",
        description: "displays your rank in the server",
        aliases: ["level"],
      	requiresDb: true,
        guildOnly: true,
        run: async (message) => {
			const member = message.mentions.users.first() || message.author;
			let xp;
			let lvl;

			const data = await rankingDb.findOne({
				guildId: message.guild.id,
				userId: member.id,
			});

			if (data) {
				xp = data.xp;
				lvl = data.lvl;
			} else if (!data) {
				const newData = new rankingDb({
					guildId: message.guild.id,
					userId: member.id,
					xp: 0,
					lvl: 0,
				});
				newData.save();
				xp = 0;
				lvl = 0;
			}

                if (xp === 0 && lvl === 0) {
                        return message.reply("You dont have any level, please send some messages and try again.");
                }

                const rankCard = new Rank()
                        .setAvatar(member.displayAvatarURL({ dynamic: false, format: "png" }))
                        .setCurrentXP(xp)
                        .setRequiredXP((lvl + 1) * 200)
                        .setStatus(member.presence.status)
                        .setProgressBar("#FFFFFF", "COLOR")
                        .setUsername(member.username)
                        .setDiscriminator(member.discriminator)
                        .setLevel(lvl)
                        .renderEmojis(true)
                        .setRank(lvl, "", false);

                rankCard.build().then(async (data) => {
                        const attachment = new discord.MessageAttachment(data, "RankCard.png");
                        message.channel.send(attachment);
                });
        }
};
