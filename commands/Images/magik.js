const fetch = require("node-fetch");

module.exports = {
  name: "magik",
  run: async (message) => {
    // const text = args.join(" ");
    const user = message.mentions.users.first() || message.author;
    const avatar = user.displayAvatarURL({ format: "png" });
    fetch(
      `https://nekobot.xyz/api/imagegen?type=magik&image=${avatar}&intensity=2`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        message.channel.send(data.message);
      });
    // message.channel.send(message.author.displayAvatarURL({ format: "png" }));
  },
};
