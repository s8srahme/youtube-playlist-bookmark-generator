const fs = require("fs");

const readCSV = require("./readCSV");

const writeBookmarks = async (datasetsFilePath, bookmarksFilePath) => {
	const dataArr = await readCSV(datasetsFilePath);
	return new Promise((resolve, reject) => {
		const header =
			// eslint-disable-next-line max-len
			"<!DOCTYPE NETSCAPE-Bookmark-file-1> <META HTTP-EQUIV='Content-Type' CONTENT='text/html; charset=UTF-8'> <TITLE>Bookmarks</TITLE> <H1>Bookmarks Menu</H1> <DL><p>     <HR>    <DT><H3 ADD_DATE='1512088815' LAST_MODIFIED='1512088815'>Imported</H3> <DL><p>";
		const footer = "</DL><p> </DL>";

		const writableStream = fs.createWriteStream(bookmarksFilePath, { flags: "w+" });
		writableStream.on("error", (error) => {
			console.log(`An error occured while writing to the file => ${error.message}`);
			reject(error);
		});

		writableStream.write(`${header}\n`);
		dataArr.forEach((row) => {
			const link = `<DT><A HREF='${row[1]}'>${row[0]}</A>`;
			writableStream.write(`${link}\n`);
		});
		writableStream.write(footer);

		writableStream.end();
		writableStream.on("finish", () => {
			console.log(`All your bookmarks have been written to ${bookmarksFilePath}`);
			resolve();
		});
	});
};

module.exports = writeBookmarks;
