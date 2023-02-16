const fs = require("fs");

const { parse } = require("csv-parse");

const readCSV = (inputFilePath) =>
	new Promise((resolve, reject) => {
		let urls = [];

		fs.createReadStream(inputFilePath)
			.pipe(parse({ delimiter: ",", from_line: 2 }))
			.on("data", (url) => {
				urls = [...urls, url];
			})
			.on("end", () => {
				console.log(`Finished reading csv => ${inputFilePath}`);
				resolve(urls.flat());
			})
			.on("error", (error) => {
				console.log(error.message);
				reject();
			});
	});

module.exports = readCSV;
