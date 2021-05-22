#! /usr/bin/env node
function config() {
	const prompt = require("prompt");
	const envfile = require("envfile");
	const fs = require("fs");

	let TOKEN;
	let PREFIX;
	let MONGO_CONNECTION_URL;
	let SPOTIFY_CLIENT_ID;
	let SPOTIFY_CLIENT_SECRET;

	const questions = [
		{
			name: "token",
			description: "Enter token for the bot, found at discord.com/developers",
			required: true
		},
		{
			name: "prefix",
			description: "Enter a prefix for the bot",
			default: "?"
		},
		{
			name: "mongoUrl",
			description: "Enter The MONGO DB CONNECTION URL, leave empty to skip",
			default: "NONE"
		},
		{
			name: "spotifyId",
			description: "Enter a SPOTIFY_CLIENT_ID, leave empty to skip",
			default: "NONE"
		},
		{
			name: "spotifySecret",
			description: "Enter a SPOTIFY_CLIENT_SECRET, leave empty to skip",
			default: "NONE"
		}
	];

	const isCorrect = [{
		name: "isCorrect",
		description: "Is this correct? (yes)",
		required: true,
		default: "yes"
	}];

	prompt.start();

	prompt.get(questions, function(err, result) {
		if (err) return console.log(err);

		TOKEN = result.token;
		PREFIX = result.prefix;
		MONGO_CONNECTION_URL = result.mongoUrl;
		SPOTIFY_CLIENT_ID = result.spotifyId;
		SPOTIFY_CLIENT_SECRET = result.spotifySecret;


		console.log(`\nTOKEN: ${TOKEN}
    PREFIX: ${PREFIX}
    MONGO_URL:${result.mongoUrl}
    SPOTIFY_CLIENT_ID: ${SPOTIFY_CLIENT_ID}
    SPOTIFY_CLIENT_SECRET: ${SPOTIFY_CLIENT_SECRET}`);

		prompt.get(isCorrect, function(err, answer){
			if (err) return console.log(err);

			if (answer.isCorrect === "yes") {
				const envData = envfile.parse(fs.readFileSync("./.env_example"));

				envData.TOKEN = TOKEN;
				envData.PREFIX = PREFIX;
				envData.MONGO_CONNECTION_URL = MONGO_CONNECTION_URL;
				envData.SPOTIFY_CLIENT_ID = SPOTIFY_CLIENT_ID;
				envData.SPOTIFY_CLIENT_SECRET = SPOTIFY_CLIENT_SECRET;

				fs.writeFileSync("./.env", envfile.stringify(envData));

			} else {
				console.log("Quitted without changes");
				return 1;
			}
		});
	});
}

module.exports.config = config;
