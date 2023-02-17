const fs = require("fs");

const { stringify } = require("csv-stringify");

const COLUMNS = ["video_title", "video_url"];

const writeCSV = (dataArr, datasetFilePath) =>
	new Promise((resolve, reject) => {
		const writableStream = fs.createWriteStream(datasetFilePath, { flags: "w+" });

		const stringifier = stringify({ header: true, columns: COLUMNS });
		dataArr.forEach((row) => {
			// Write records to the stream
			stringifier.write(row);
		});
		stringifier.pipe(writableStream);
		// Close the writable stream
		stringifier.end();

		writableStream
			.on("finish", () => {
				console.log(`Finished writing data => ${datasetFilePath}`);
				resolve();
			})
			.on("error", (err) => {
				console.log(err.message);
				reject(err);
			});
		writableStream.end();
	});

module.exports = { writeCSV, COLUMNS };
