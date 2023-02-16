const path = require("path");

const browserObject = require("./src/browser");
const scraperController = require("./src/pageController");

// Start the browser and create a browser instance
const browserInstance = browserObject.startBrowser();

// Get command line argument for file name
const fileName = process.argv[2];

if (fileName) {
	const inputFilePath = path.join(__dirname, `./input/${fileName}`);
	const outputFilePath = path.join(__dirname, `./output/${fileName}`);

	// Pass the browser instance to the scraper controller
	scraperController(browserInstance, inputFilePath, outputFilePath);
} else console.log("Could not resolve file path");
