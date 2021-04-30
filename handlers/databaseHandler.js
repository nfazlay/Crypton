const mongoose = require("mongoose");

function config() {
	if (process.env.MONGO_CONNECTION_URL) {
		mongoose.connect(process.env.MONGO_CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
	} else {
		throw new Error("MONGO_CONNECTION_URL not found in .env");
	}
}

module.exports.config = config;
