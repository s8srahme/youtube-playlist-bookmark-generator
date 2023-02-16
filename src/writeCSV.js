const fs = require("fs");

const { stringify } = require("csv-stringify");

const columns = ["title", "url"];

const writeCSV = (dataArr, outputFilePath) =>
	new Promise((resolve, reject) => {
		const writableStream = fs.createWriteStream(outputFilePath, { flags: "w+" });

		const stringifier = stringify({ header: true, columns });
		dataArr.forEach((row) => {
			// Write records to the stream
			stringifier.write(row);
		});
		stringifier.pipe(writableStream);
		// Close the writable stream
		stringifier.end();

		writableStream
			.on("finish", () => {
				console.log(`Finished writing data => ${outputFilePath}`);
				resolve();
			})
			.on("error", (err) => {
				console.log(err.message);
				reject(err);
			});
		writableStream.end();
	});

module.exports = { writeCSV, columns };
