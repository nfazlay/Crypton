#! /usr/bin/env node

function run() {
	const shell = require("shelljs");
	const { version } = require("../package.json");

	console.log(`Starting bot now using Crypton CLI v${version}`);

	shell.exec("node index.js");
}

module.exports.run = run;
