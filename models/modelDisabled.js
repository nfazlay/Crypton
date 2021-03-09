const mongoose = require("mongoose");

const disabledSchema = new mongoose.Schema({
	guildId: String,
	disabledChannels: Array,
	disabledSpecials: Array,
});

module.exports = mongoose.model("disabled", disabledSchema);
