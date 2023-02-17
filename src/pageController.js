const formatData = require("./formatData");
const pageScraper = require("./pageScraper");
const writeBookmarks = require("./writeBookmarks");
const { writeCSV, COLUMNS } = require("./writeCSV");

async function scrapeAll(browserInstance, takeoutFilePath, datasetFilePath, bookmarkFilePath) {
	let browser;
	try {
		browser = await browserInstance;

		// Call the scraper for different videos to be scraped
		const scrapedData = await pageScraper.scraper(browser, takeoutFilePath);
		// console.log(`Data scraped => ${JSON.stringify(Object.entries(scrapedData), null, 2)}`);

		const formattedData = formatData(scrapedData, COLUMNS);
		await writeCSV(formattedData, datasetFilePath);
		console.log(
			"The data has been scraped and saved successfully!",
			`View it at ${datasetFilePath}`
		);

		await writeBookmarks(formattedData, bookmarkFilePath);
	} catch (err) {
		console.log("Could not resolve the browser instance => ", err);
	}
	await browser.close();
}

module.exports = scrapeAll;
