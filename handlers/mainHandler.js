function config(args, client) {
  if (args.find(element => element === "MUSIC")) {
    /* musicHandler */
    require("./musicHandler.js").config(client);
  }
  if (args.find(element => element === "DATABASE")) {
  /* databaseHandler */
  require("./databaseHandler.js").config();
  }
  /* Essential to bot, always started by default */
  /* commandHandler */
  require("./commandHandler.js").config(client);
  /* eventHandler */
  require("./eventHandler.js").config(client);
  /* errorHandler */
  require("./errorHandler.js").config();
}

module.exports.config = config;
