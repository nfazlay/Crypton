const mongoose = require("mongoose");

const prefixSchema = new mongoose.Schema({
	prefix: String,
	guildId: Number,
});

module.exports = mongoose.model("Prefix", prefixSchema);