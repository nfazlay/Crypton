const mongoose = require("mongoose");

const welcomingSchema = new mongoose.Schema({
	guildId: String,
	role: String,
	message: String,
	channel: String,
});

module.exports = mongoose.model("welcoming", welcomingSchema);
