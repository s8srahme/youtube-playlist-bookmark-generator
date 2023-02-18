const fs = require("fs");

const { parse } = require("csv-parse");

const readCSV = (chunksFilePath) =>
	new Promise((resolve, reject) => {
		let rows = [];

		fs.createReadStream(chunksFilePath)
			.pipe(parse({ delimiter: ",", from_line: 2 }))
			.on("data", (row) => {
				rows = [...rows, row];
			})
			.on("end", () => {
				console.log(`Finished reading csv => ${chunksFilePath}`);
				resolve(rows);
			})
			.on("error", (error) => {
				console.log(error.message);
				reject();
			});
	});

module.exports = readCSV;
