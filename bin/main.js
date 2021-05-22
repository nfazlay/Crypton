#! /usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");

const usage = chalk.hex('#83aaff')("\nUsage: crypton <command>");

const runjs = require("./run.js");
const configjs = require("./config.js");

const options = yargs
	.usage(usage)
	.option("c", { alias:"config", describe: "Config crypton settings" })
	.option("r", { alias: "run", describe: "Run crypton, requires configurations to be set!" })
	.help(true)
	.showHelpOnFail(true)
	.argv;

function call(args) {
	if (args[0] === "run" || yargs.argv.r == true || yargs.argv.run == true) {
		runjs.run();
	} else if (args[0] === "config" || yargs.argv.c == true || yargs.argv.config == true) {
		configjs.config();
	} else {
	yargs.showHelp()
	}
}


call(yargs.argv._);
