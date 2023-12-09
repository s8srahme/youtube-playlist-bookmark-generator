const path = require("path");

const browserObject = require("./src/browser");
const scraperController = require("./src/pageController");

const OPTIONS = ["scrape", "bookmark"];

let method;
let filename;
let filenameWithoutExt;
let destinationDirectoryPath;

const printUsageText = () => {
	// Usage text represents the help guide
	const usageText = `
  Usage: npm start <method> <filename> <directory>

	Options:
				<method>			Method to perform on the matching filename; [required]
											<method> is 'scrape' or 'bookmark'
				<filename>		Filename																		[required]
				<directory>		Absolute destination directory path					[required]
  `;
	console.log(usageText);
};

const isArgumentValid = () => {
	// Get command line arguments
	[, , method, filename, destinationDirectoryPath] = process.argv;
	filenameWithoutExt = path.parse(filename).name;

	const missingArguments = [];

	if (!OPTIONS.includes(method)) missingArguments.push("<method>");
	if (!filename.includes(".csv")) missingArguments.push("<filename>");
	if (!destinationDirectoryPath) missingArguments.push("<directory>");

	if (missingArguments.length > 0) {
		printUsageText();
		console.log(`\nEither invalid or missing required argument(s): ${missingArguments.toString().replace(",", " ")}`);
		return false;
	}
	return true;
};

// Either scrape titles from URLs or bookmark titles into matching filename
const main = () => {
	if (isArgumentValid()) {
		// Set file paths
		const videoUrlsChunksFilePath = `${destinationDirectoryPath}/urls_chunks/${filename}`;
		const videoTitlesChunksFilePath = `${destinationDirectoryPath}/titles_chunks/${filename}`;
		const videoTitlesFilePath = `${destinationDirectoryPath}/titles/${filename}`;
		const bookmarksFilePath = `${destinationDirectoryPath}/bookmarks/${filenameWithoutExt}.html`;

		const { scrapeAll, bookmarkAll } = scraperController;
		if (method === "scrape") {
			const browserInstance = browserObject.startBrowser(); // Start browser and create a browser instance
			scrapeAll(browserInstance, videoUrlsChunksFilePath, videoTitlesChunksFilePath); // Pass browser instance to scraper controller
		} else if (method === "bookmark") bookmarkAll(videoTitlesFilePath, bookmarksFilePath, filenameWithoutExt);
	}
};

main();
