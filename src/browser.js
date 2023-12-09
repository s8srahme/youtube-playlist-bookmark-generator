const puppeteer = require("puppeteer");

const { log } = console;

async function startBrowser() {
	let browser;
	try {
		log("🌐  Opening the browser...");
		browser = await puppeteer.launch({
			headless: "new",
			args: ["--disable-setuid-sandbox"],
			ignoreHTTPSErrors: true,
			defaultViewport: null
		});
	} catch (error) {
		log("❌  Could not create a browser instance => ", error.message);
	}
	return browser;
}

module.exports = {
	startBrowser
};
