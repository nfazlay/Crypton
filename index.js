/* Dot env configuration */
require("dotenv").config();
/* Librarys that we will be using */
const discord = require("discord.js");
const fs = require("fs");
const winston = require("winston");
const mongoose = require("mongoose");
/* The client object */
const client = new discord.Client();
/* Logger for errors */
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "error-log" }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});
/* Client events for logging */
client.on("debug", m => logger.log("debug", m));
client.on("warn", m => logger.log("warn", m));
client.on("error", m => logger.log("error", m));

/* Mongo DB connection */
mongoose.connect(process.env.MONGO_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
/* Commands and categories */
client.commands = new discord.Collection();
client.categories = new discord.Collection();
/* Go through each folder and command and add them to the collection */
const folders = fs.readdirSync("./commands");
for (const folder of folders) {
  client.categories.set(folder.toLowerCase(), { name: folder.toLowerCase(), Collection: new discord.Collection() });
  const commands = fs.readdirSync(`./commands/${folder}`);
  for (const commandFile of commands) {
    const command = require(`./commands/${folder}/${commandFile}`);
    client.commands.set(command.name.toLowerCase(), command);
	client.categories.get(folder.toLowerCase()).Collection.set(command.name.toLowerCase(), command);
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
/* Handle errors */
process.on("unhandledRejection", error => logger.log("error", error));
process.on("uncaughtException", error => logger.log("error", error));
/* Log-in the client using super secret token */
client.login(process.env.TOKEN);
