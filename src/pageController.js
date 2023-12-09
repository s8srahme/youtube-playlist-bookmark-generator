const pageScraper = require("./pageScraper");
const writeBookmarks = require("./writeBookmarks");
const { writeCSV, COLUMNS } = require("./writeCSV");

const { error } = console;

const formatData = (dataArr, keys) => {
	let formattedData = [];
	for (const obj of dataArr) {
		if (Object.keys(obj).length !== 0) {
			const row = keys.map((key) => obj[key]);
			formattedData = [...formattedData, row];
		}
	}
	return formattedData;
};

async function scrapeAll(browserInstance, videoUrlsChunksFilePath, videoTitlesChunksFilePath) {
	let browser;
	try {
		browser = await browserInstance;

		// Call the scraper for different videos to be scraped
		const scrapedData = await pageScraper.scraper(browser, videoUrlsChunksFilePath);
		// console.log(`Data scraped => ${JSON.stringify(Object.entries(scrapedData), null, 2)}`);

		const formattedData = formatData(scrapedData, COLUMNS);
		await writeCSV(formattedData, videoTitlesChunksFilePath);
		// console.log("The data has been scraped and saved successfully!", `View it at ${videoTitlesChunksFilePath}`);
	} catch (err) {
		error("❌  Could not resolve the browser instance => ", err.message);
	}
	await browser.close();
}

async function bookmarkAll(videoTitlesFilePath, bookmarksFilePath, filenameWithoutExt) {
	await writeBookmarks(videoTitlesFilePath, bookmarksFilePath, filenameWithoutExt);
}

module.exports = { scrapeAll, bookmarkAll };
