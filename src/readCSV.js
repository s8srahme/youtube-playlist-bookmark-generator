const fs = require("fs");

const { parse } = require("csv-parse");

const { log, error } = console;

const readCSV = (videoUrlsChunksFilePath) =>
	new Promise((resolve, reject) => {
		let rows = [];

		fs.createReadStream(videoUrlsChunksFilePath)
			.pipe(parse({ delimiter: ",", from_line: 2 }))
			.on("data", (row) => {
				rows = [...rows, row];
			})
			.on("end", () => {
				log("📖  Finished reading csv");
				resolve(rows);
			})
			.on("error", (err) => {
				error(`❌  ${err.message}`);
				reject();
			});
	});

module.exports = readCSV;
