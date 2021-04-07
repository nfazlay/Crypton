/* Dot env configuration */
require("dotenv").config();
/* Discord module */
const discord = require("discord.js");
/* The client object */
const client = new discord.Client();
/* Use Handlers to enable features not enabled by default */
require("./handlers/mainHandler.js").config(["MUSIC", "DATABASE"], client)
/* Log-in the client using super secret token if any*/
if (process.env.TOKEN) {
  client.login(process.env.TOKEN);
} else {
  console.error("ERROR: Token not found in .env file! Make sure you have the token correct");
  process.exit(1);
}
