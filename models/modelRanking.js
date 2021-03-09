const mongoose = require("mongoose");

const RankingSchema = new mongoose.Schema({
	guildId: String,
	userId: String,
	xp: Number,
	lvl: Number,
});

module.exports = mongoose.model("Ranking", RankingSchema);