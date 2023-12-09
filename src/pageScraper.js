const readCSV = require("./readCSV");
const { COLUMNS } = require("./writeCSV");

const VIDEO_UNAVAILABLE = [
	"Video unavailable",
	"Video nicht verfügbar",
	"This video isn't available anymore",
	"Dieses Video ist nicht mehr verfügbar"
];
const PRIVATE_VIDEO = ["Private video", "Privates Video"];

const { error } = console;

const scraperObject = {
	async scraper(browser, videoUrlsChunksFilePath) {
		const playlistArr = await readCSV(videoUrlsChunksFilePath);
		const dataArr = await new Promise(async (resolve) => {
			try {
				const scrapedData = await Promise.all(
					playlistArr.map(async (row) => {
						const link = row[0];
						const currentPageData = await this.pagePromise(browser, link);
						return currentPageData;
					})
				);
				resolve(scrapedData);
			} catch (err) {
				error(`❌  Error in ${this.fileLocation} => ${err.message}`);
				resolve([]);
			}
		});

		return dataArr;
	},
	pagePromise(browser, link) {
		return new Promise(async (resolve) => {
			const newPage = await browser.newPage();
			await newPage.setDefaultTimeout(120000);
			const dataObj = {};

			try {
				// Navigate to the selected page
				await newPage.goto(link);
				const videoUnavailableTitleSelector = "div.promo-title.style-scope.ytd-background-promo-renderer";
				const arbitraryTitleSelector = "h1.style-scope.ytd-watch-metadata > .style-scope.ytd-watch-metadata";
				const privateVideoTitleSelector = "#reason.style-scope.yt-player-error-message-renderer";

				// Wait for the required DOM to be rendered
				const foundElement = await newPage.waitForSelector(
					[videoUnavailableTitleSelector, arbitraryTitleSelector, privateVideoTitleSelector].join(",")
				);
				// Extract title
				const title = await newPage.evaluate((el) => el.innerText, foundElement);
				if ([...VIDEO_UNAVAILABLE, ...PRIVATE_VIDEO].includes(title)) resolve(dataObj);
				else {
					dataObj[COLUMNS[0].toString()] = title;
					dataObj[COLUMNS[1].toString()] = link;
					resolve(dataObj);
				}
			} catch (err) {
				error(`❌  Error in ${link} => ${err.message}`);
				resolve(dataObj);
			}

			await newPage.close();
		});
	}
};

module.exports = scraperObject;
