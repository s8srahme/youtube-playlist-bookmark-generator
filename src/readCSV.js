const fs = require("fs");

const { parse } = require("csv-parse");

const readCSV = (takeoutFilePath) =>
	new Promise((resolve, reject) => {
		let urls = [];

		fs.createReadStream(takeoutFilePath)
			.pipe(parse({ delimiter: ",", from_line: 2 }))
			.on("data", (url) => {
				urls = [...urls, url[0]];
			})
			.on("end", () => {
				console.log(`Finished reading csv => ${takeoutFilePath}`);
				resolve(urls);
			})
			.on("error", (error) => {
				console.log(error.message);
				reject();
			});
	});

module.exports = readCSV;
