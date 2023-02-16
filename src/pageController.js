const formatData = require("./formatData");
const pageScraper = require("./pageScraper");
const { writeCSV, columns } = require("./writeCSV");

async function scrapeAll(browserInstance, inputFilePath, outputFilePath) {
	let browser;
	try {
		browser = await browserInstance;

		// Call the scraper for different videos to be scraped
		const scrapedData = await pageScraper.scraper(browser, inputFilePath);
		console.log(`Data scraped => ${JSON.stringify(Object.entries(scrapedData), null, 2)}`);

		const formattedData = formatData(scrapedData, columns);
		await writeCSV(formattedData, outputFilePath);

		console.log(
			"The data has been scraped and saved successfully!",
			`View it at ${outputFilePath}`
		);
	} catch (err) {
		console.log("Could not resolve the browser instance => ", err);
	}
	await browser.close();
}

module.exports = scrapeAll;
