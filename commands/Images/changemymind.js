const fetch = require("node-fetch");

module.exports = {
  name: "changemymind",
  run: async (message, args) => {
    const text = args.join(" ");
    fetch(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        message.channel.send(data.message);
      });
    // message.channel.send(message.author.displayAvatarURL({ format: "png" }));
  },
};
