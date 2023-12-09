const fs = require("fs");

const readCSV = require("./readCSV");

const { error, log } = console;

const changeSnakeToTitleCase = (text) => {
	return text
		.split("_")
		.filter((word) => word.length > 0)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

const writeBookmarks = async (videoTitlesFilePath, bookmarksFilePath, filenameWithoutExt) => {
	const dataArr = await readCSV(videoTitlesFilePath);
	return new Promise((resolve, reject) => {
		const header = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
	<DT><H3>${changeSnakeToTitleCase(filenameWithoutExt)}</H3>
	<DL><p>
`;
		const footer = `
	</DL><p>
</DL><p>
`;

		const writableStream = fs.createWriteStream(bookmarksFilePath, { flags: "w+" });
		writableStream.on("error", (err) => {
			error(`❌  An error occured while writing to the file => ${err.message}`);
			reject(error);
		});

		writableStream.write(`${header}`);
		dataArr.forEach((row, rowIndex) => {
			const link = `		<DT><A HREF='${row[1]}'>${row[0]}</A>`;
			writableStream.write(`${link}${rowIndex !== dataArr.length - 1 ? "\n" : ""}`);
		});
		writableStream.write(footer);

		writableStream.end();
		writableStream.on("finish", () => {
			log("📝  Finished writing html");
			resolve();
		});
	});
};

module.exports = writeBookmarks;
