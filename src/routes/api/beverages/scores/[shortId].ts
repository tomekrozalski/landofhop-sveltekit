import puppeteer from 'puppeteer';
// import {  getDbCollections } from '$lib/utils/api';
// import type { Details } from '$lib/utils/types/Beverage/Details';
// import countryList from '$lib/utils/api/countryList';

export async function get({ params }) {
	const { shortId } = params;
	// const { basics, beverages } = await getDbCollections();

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.ratebeer.com/beer/nepomucen-pinta-viva-sliwa/534459/');
	await page.waitForSelector('.BeerCard___StyledDiv-cAaXbV .hwjOn');

	const score = await page.evaluate(() => {
		const element = document.querySelector('.BeerCard___StyledDiv-cAaXbV .hwjOn');

		if (!element || typeof +element.textContent !== 'number') {
			return false;
		}

		return +element.textContent;
	});

	await browser.close();

	return {
		body: { score }
	};
}
