const formatData = require("./formatData");
const pageScraper = require("./pageScraper");
const writeBookmarks = require("./writeBookmarks");
const { writeCSV, COLUMNS } = require("./writeCSV");

async function scrapeAll(browserInstance, chunksFilePath, datasetsFilePath) {
	let browser;
	try {
		browser = await browserInstance;

		// Call the scraper for different videos to be scraped
		const scrapedData = await pageScraper.scraper(browser, chunksFilePath);
		// console.log(`Data scraped => ${JSON.stringify(Object.entries(scrapedData), null, 2)}`);

		const formattedData = formatData(scrapedData, COLUMNS);
		await writeCSV(formattedData, datasetsFilePath);
		console.log("The data has been scraped and saved successfully!", `View it at ${datasetsFilePath}`);
	} catch (err) {
		console.log("Could not resolve the browser instance => ", err);
	}
	await browser.close();
}

async function bookmarkAll(datasetsFilePath, bookmarksFilePath) {
	await writeBookmarks(datasetsFilePath, bookmarksFilePath);
}

module.exports = { scrapeAll, bookmarkAll };
