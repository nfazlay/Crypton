const mongoose = require("mongoose");

const leavingSchema = new mongoose.Schema({
	guildId: String,
	role: String,
	message: String,
	channel: String,
});

module.exports = mongoose.model("leaving", leavingSchema);
