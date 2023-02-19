// Scrape data from URLs given in specified file
// Usage: npm start [OPTION] [FILENAME]

const path = require("path");

const browserObject = require("./src/browser");
const scraperController = require("./src/pageController");

const OPTIONS = ["scrape", "bookmark"];

// Get command line arguments
const option = process.argv[2];
const filename = process.argv[3];
const filenameWithoutExt = path.parse(filename).name;

const chunksFilePath = path.join(__dirname, `./chunks/${filename}`);
const datasetsFilePath = path.join(__dirname, `./datasets/${filename}`);
const bookmarksFilePath = path.join(__dirname, `./bookmarks/${filenameWithoutExt}.html`);

if (!OPTIONS.includes(option) || !filename.includes(".csv")) {
	console.log("Could not resolve arguments.\nUsage:\nnpm start scrape [FILENAME]\nnpm start bookmark [FILENAME]");
} else if (option === "scrape") {
	// Start the browser and create a browser instance
	const browserInstance = browserObject.startBrowser();
	// Pass the browser instance to the scraper controller
	scraperController.scrapeAll(browserInstance, chunksFilePath, datasetsFilePath);
} else if (option === "bookmark") {
	// Pass the browser instance to the scraper controller
	scraperController.bookmarkAll(datasetsFilePath, bookmarksFilePath);
}
