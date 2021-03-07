const mongoose = require("mongoose");

const disabledSchema = new mongoose.Schema({
	guildId: String,
	disabledChannels: Array,
});

module.exports = mongoose.model("disabledChannel", disabledSchema);
