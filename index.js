/* Dot env configuration */
require("dotenv").config();
/* Librarys that we will be using */
const discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const { Manager } = require("erela.js");

/* The client object */
const client = new discord.Client();

/* Music Configuration */

client.manager = new Manager({
  nodes: [
    {
      host: "localhost",
      retryDelay: 5000,
      port: 2220,
      password: "cryptonmusic",
    },
  ],
  autoPlay: true,
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
})
  .on("nodeConnect", (node) =>
    console.log(`Node "${node.options.identifier}" connected.`)
  )
  .on("nodeError", (node, error) =>
    console.log(
      `Node "${node.options.identifier}" encountered an error: ${error.message}.`
    )
  )
  .on("trackStart", (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);
    channel.send(
      `Now playing: \`${track.title}\`, requested by \`${track.requester.tag}\`.`
    );
  })
  //eslint-disable-next-line
  .on("trackEnd", (player, track, payload) => {
    // console.log(player);
  })
  .on("queueEnd", (player) => {
    const channel = client.channels.cache.get(player.textChannel);
    channel.send("Queue has ended.");
    player.destroy();
  });
/* Mongo DB connection */
if (process.env.MONGO_CONNECTION_URL) {
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}
/* Commands and categories */
client.commands = new discord.Collection();
client.categories = new discord.Collection();
/* Go through each folder and command and add them to the collection */
const folders = fs.readdirSync("./commands");
for (const folder of folders) {
  client.categories.set(folder.toLowerCase(), {
    name: folder.toLowerCase(),
    Collection: new discord.Collection(),
  });
  const commands = fs.readdirSync(`./commands/${folder}`);
  for (const commandFile of commands) {
    const command = require(`./commands/${folder}/${commandFile}`);
    client.commands.set(command.name.toLowerCase(), command);
    client.categories
      .get(folder.toLowerCase())
      .Collection.set(command.name.toLowerCase(), command);
  }
}
/* Go through each event file and add them */
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const eventFile of eventFiles) {
  const event = require(`./events/${eventFile}`);
  if (event.once) {
    client.once(event.name, (...args) => event.run(...args, client));
  } else {
    client.on(event.name, (...args) => event.run(...args, client));
  }
}
/* extraevent */
client.on("raw", (d) => client.manager.updateVoiceState(d));
/* Handle errors */
process.on("unhandledRejection", (error) => console.log(error));
process.on("uncaughtException", (error) => console.log(error));

/* Log-in the client using super secret token */
if (process.env.TOKEN) {
  client.login(process.env.TOKEN);
} else {
  console.error();("ERROR: Token not found in .env file! Make sure you have the token correct");
}
