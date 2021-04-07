const mongoose = require("mongoose");

const economySchema = new mongoose.Schema({
    userId: String,
    cash: Number,
    level: Number,
    workingAs: String,
    stonks: Array,
    inventory: Array,
	lastWorked: Number,
	lastRedeemedDaily: Number,
	lastRedeemedWeekly: Number,
});

module.exports = mongoose.model("economy", economySchema);