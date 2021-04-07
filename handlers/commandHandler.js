const discord = require("discord.js");
const fs = require("fs");

function config(client) {
  /* Commands and categories */
  client.commands = new discord.Collection();
  client.categories = new discord.Collection();
  /* Go through each folder and command and add them to the collection */
  const folders = fs.readdirSync("./commands");
  for (const folder of folders) {
    client.categories.set(folder.toLowerCase(), new discord.Collection());
    const commands = fs.readdirSync(`./commands/${folder}`);
    for (const commandFile of commands) {
      const command = require(`../commands/${folder}/${commandFile}`);
      client.commands.set(command.name.toLowerCase(), command);
      client.categories.get(folder.toLowerCase()).set(command.name.toLowerCase(), command);
    }
  }
  return 1;
}

module.exports.config = config;
