const readCSV = require("./readCSV");
const { COLUMNS } = require("./writeCSV");

const VIDEO_UNAVAILABLE = "Video unavailable";
const PRIVATE_VIDEO = "Private video";

const scraperObject = {
	async scraper(browser, chunksFilePath) {
		const takeoutArr = await readCSV(chunksFilePath);

		const dataArr = await new Promise(async (resolve) => {
			try {
				const scrapedData = await Promise.all(
					takeoutArr.map(async (row) => {
						const link = row[0];
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
			await newPage.setDefaultTimeout(300000);
			const dataObj = {};

			try {
				// Navigate to the selected page
				await newPage.goto(link);
				const videoUnavailableTitleSelector = "div.promo-title.style-scope.ytd-background-promo-renderer";
				// eslint-disable-next-line max-len
				const arbitraryTitleSelector = "h1.style-scope.ytd-watch-metadata > .style-scope.ytd-watch-metadata";
				const privateVideoTitleSelector = ".style-scope.yt-player-error-message-renderer";

				// Wait for the required DOM to be rendered
				const foundElement = await newPage.waitForSelector([videoUnavailableTitleSelector, arbitraryTitleSelector, privateVideoTitleSelector].join(","));
				// Extract title
				const title = await newPage.evaluate((el) => el.innerText, foundElement);
				if (title === VIDEO_UNAVAILABLE || title === PRIVATE_VIDEO) resolve(dataObj);
				else {
					dataObj[COLUMNS[0].toString()] = title;
					dataObj[COLUMNS[1].toString()] = link;
					resolve(dataObj);
				}
			} catch (error) {
				console.log(`Error in ${link} => ${error.message}`);
				resolve(dataObj);
			}

			await newPage.close();
		});
	}
};

module.exports = scraperObject;
