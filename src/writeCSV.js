const fs = require("fs");

const { stringify } = require("csv-stringify");

const COLUMNS = ["video_title", "video_url"];

const { log, error } = console;

const writeCSV = (dataArr, videoTitlesFilePath) =>
	new Promise((resolve, reject) => {
		const writableStream = fs.createWriteStream(videoTitlesFilePath, { flags: "w+" });

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
				log("📝  Finished writing csv");
				resolve();
			})
			.on("error", (err) => {
				error(`❌  ${err.message}`);
				reject(err);
			});
		writableStream.end();
	});

module.exports = { writeCSV, COLUMNS };
