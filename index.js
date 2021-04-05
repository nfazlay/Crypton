/* Dot env configuration */
require("dotenv").config();
/* Discord module */
const discord = require("discord.js");
/* The client object */
const client = new discord.Client();
const developers = [];
client.fetchApplication().then(data => {
  if (data.owner.id) {
    developers.push(data.owner.id);
  } else if (!data.owner.id) {
    data.owner.members.forEach(member => {
      developers.push(member.id);
    });
  }
});

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
