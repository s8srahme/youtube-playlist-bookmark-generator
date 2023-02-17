// Scrape data from URLs given in specified file
// Usage: npm start [FILENAME]

const path = require("path");

const browserObject = require("./src/browser");
const scraperController = require("./src/pageController");

// Start the browser and create a browser instance
const browserInstance = browserObject.startBrowser();

// Get command line argument for file name
const fileName = process.argv[2];
const fileNameWithoutExt = path.parse(fileName).name;

if (fileName) {
	const takeoutFilePath = path.join(__dirname, `./takeout/${fileName}`);
	const datasetFilePath = path.join(__dirname, `./datasets/${fileName}`);
	const bookmarkFilePath = path.join(__dirname, `./bookmarks/${fileNameWithoutExt}.html`);
	// Pass the browser instance to the scraper controller
	scraperController(browserInstance, takeoutFilePath, datasetFilePath, bookmarkFilePath);
} else console.log("Could not resolve file path");
