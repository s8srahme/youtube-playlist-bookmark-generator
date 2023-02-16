const readCSV = require("./readCSV");

const scraperObject = {
	async scraper(browser, inputFilePath) {
		const urls = await readCSV(inputFilePath);

		const dataArr = await new Promise(async (resolve) => {
			try {
				const scrapedData = await Promise.all(
					urls.map(async (link) => {
						const currentPageData = await this.pagePromise(browser, link);
						return currentPageData;
					})
				);
				resolve(scrapedData);
			} catch (error) {
				console.log(`Error in ${this.fileLocation} => ${error.message}`);
				resolve([]);
			}
		});

		return dataArr;
	},
	pagePromise(browser, link) {
		return new Promise(async (resolve) => {
			const newPage = await browser.newPage();
			const dataObj = {};

			try {
				// Navigate to the selected page
				await newPage.goto(link);
				// Wait for the required DOM to be rendered
				await newPage.waitForSelector("h1.style-scope.ytd-watch-metadata");
				// Get the title for displayed video
				const title = await newPage.$eval(
					"h1.style-scope.ytd-watch-metadata > .style-scope.ytd-watch-metadata",
					(el) => el.textContent
				);

				dataObj.title = title;
				dataObj.url = link;
				resolve(dataObj);
			} catch (error) {
				console.log(`Error in ${link} => ${error.message}`);
				resolve(dataObj);
			}

			await newPage.close();
		});
	}
};

module.exports = scraperObject;
