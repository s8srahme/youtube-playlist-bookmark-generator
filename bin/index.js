#!/usr/bin/env node

const { spawn } = require("child_process");

const yargs = require("yargs");

const { log, error } = console;

const options = yargs
	.usage(
		"ypbg helps you convert YouTube playlists into browser bookmarks.\n\nUsage: -s <source-path> -d <destination-path>"
	)
	.option("s", { alias: "source", describe: "Absolute source directory path", type: "string", demandOption: true })
	.option("d", {
		alias: "destination",
		describe: "Absolute destination directory path",
		type: "string",
		demandOption: true
	})
	.option("v", {
		alias: "verbose",
		describe: "Run with verbose logging",
		type: "boolean"
	}).argv;

const main = (command, args, callback) => {
	log("⭕  Starting child process...");
	const child = spawn(command, args);

	child.stdout.setEncoding("utf8");
	child.stdout.on("data", (data) => {
		if (options.verbose) log(data);
	});

	child.stderr.setEncoding("utf8");
	child.stderr.on("data", (data) => {
		error(`stderr: ${data}`);
	});

	child.on("close", (exitCode) => {
		callback(exitCode);
	});
};

main("npm", ["run", "shell:main", options.source, options.destination], (exitCode) => {
	log(`💯  Child process exited with code ${exitCode}`);
});
