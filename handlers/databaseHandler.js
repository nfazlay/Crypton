const mongoose = require("mongoose");

function config() {
    if (process.env.MONGO_CONNECTION_URL) {
        mongoose.connect(process.env.MONGO_CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
    } else {
      console.log(
        `MongoDb connection was asked but URL was not provided in .env
        please provide a MongoDb compass URL or remove the intent Bot will now quit`);
        process.exit(1);
    }
}

module.exports.config = config;
