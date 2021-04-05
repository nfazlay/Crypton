/* Dot env configuration */
require("dotenv").config();
/* Discord module */
const discord = require("discord.js");
/* The client object */
const client = new discord.Client();
/* commandHandler */
require("./scripts/commandHandler.js").config(client);
/* eventHandler */
require("./scripts/eventHandler.js").config(client);
/* databaseHandler */
require("./scripts/databaseHandler.js").config();
/* errorHandler */
require("./scripts/errorHandler.js").config();
/* musicHandler */
require("./scripts/musicHandler.js").config(client);
// /* Log-in the client using super secret token if any*/
if (process.env.TOKEN) {
  client.login(process.env.TOKEN);
} else {
  console.error("ERROR: Token not found in .env file! Make sure you have the token correct");
  process.exit(1);
}
