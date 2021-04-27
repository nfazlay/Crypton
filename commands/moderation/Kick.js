const discord = require("discord.js");
module.exports = {
  name: "Kick",
  description: "This is Kick Command!",
  cooldown: "0",
  guildOnly: true,
  permissions: "KICK_MEMBERS",
  run: async (message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member) {
      const nouserEmbed = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "<:CryptonError:814768294795411457> No User Was Mentioned to kick"
        );
      return message.channel.send(nouserEmbed);
    }
    args.shift();
    const reason = args.join(" ");
    if (!reason) {
      if (member.kickable) {
        member.kick();
        const noReasonKickedEmbed = new discord.MessageEmbed()
          .setColor("BLUE")
          .setDescription(
            `<:CryptonSuccess:814768294849675264> Kicked ${member.username}#${member.discriminator} | No Reason.`
          );
        return message.channel.send(noReasonKickedEmbed);
      }
      const noPermsError = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "<:CryptonError:814768294795411457> I am not high enough in the role hierarchy to do that."
        );
      return message.channel.send(noPermsError);
    }
    if (member.kickable) {
      member.kick(reason);
      const noReasonKickedEmbed = new discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription(
          `<:CryptonSuccess:814768294849675264> Kicked ${member.username}#${member.discriminator} | Reason: ${reason}`
        );
      return message.channel.send(noReasonKickedEmbed);
    }
    const noPermsError = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "<:CryptonError:814768294795411457> I am not high enough in the role hierarchy to do that."
      );
    return message.channel.send(noPermsError);
  },
};
