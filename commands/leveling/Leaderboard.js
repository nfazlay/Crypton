//eslint-disable-next-line
const { MessageEmbed } = require("discord.js");
const RankingSchema = require("../../models/modelRanking");

module.exports = {
  name: "leaderboard",
  descripton: "Leaderboard of your Server",
  aliases: ["lb", "top"],
  requiresDb: true,
  guildOnly: true,
  run: async (message) => {
    const guildId = message.guild.id;
    //eslint-disable-next-line
    let desc = ``;
    let results;
    try {
      const res = await RankingSchema.find({ guildId })
        .sort({ lvl: -1, xp: -1 })
        .limit(10);
      results = res;
    } catch (error) {
      console.error(error);
      message.reply("There Was An Error!");
    }
    // console.log(results);

    for (let i = 0; i < results.length; i++) {
      const { userId, xp, lvl } = results[i];
      const { user } = message.guild.members.cache.get(userId);
      desc += `**#${i + 1}  ${user.tag}**
        **- Level  :** ${lvl} **- Xp  :** ${xp}\n\n`;
    }
    // message.channel.send(desc);
    const leaderBeardEmbed = new MessageEmbed()
      .setColor("#2DDBE2")
      .setAuthor("Crypton leveling")
      .setFooter("Leaderboard As")
      .setTimestamp()
      .setTitle(`Leaderboard of ***${message.guild.name}***`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(desc);

    message.channel.send(leaderBeardEmbed);
  },
};
