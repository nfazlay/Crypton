module.exports = {
  name: "ready",
  once: true,
  run: (client) => {
    //initialzes Music
    client.manager.init(client.user.id);

    const randomStaus = () => {
      const statusArray = [
        {
          text: `:Help in ${client.guilds.cache.size} guilds with ${client.users.cache.size} users!`,
          type: "PLAYING",
        },
        {
          text: "Crypton Music",
          type: "LISTENING",
        },
      ];
      const status = Math.floor(Math.random() * statusArray.length);
      client.user.setActivity(statusArray[status].text, {
        type: statusArray[status].type,
      });
    };
    setInterval(randomStaus, 30000);
    console.log(`Logged in as ${client.user.tag}!`);
  },
};
