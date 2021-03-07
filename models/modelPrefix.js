const mongoose = require("mongoose");

const prefixSchema = new mongoose.Schema({
	prefix: String,
	guildId: String,
});

module.exports = mongoose.model("Prefix", prefixSchema);