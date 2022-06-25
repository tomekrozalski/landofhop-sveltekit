import puppeteer from 'puppeteer';
import { getDbCollections } from '$lib/utils/api';

async function updateUntappdRating(untappBeerSlug: string, beverageShortId: string) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://untappd.com/b${untappBeerSlug}`);

	const rating = await page.evaluate(() => {
		const rating: HTMLElement = document.querySelector('.details .caps');
		const raters = document.querySelector('.details .raters');

		if (!rating || !raters) {
			return {
				quantity: 0,
				value: 0
			};
		}

		return {
			quantity: Number(raters.textContent.replace(/\D/g, '')) || 0,
			value: Number(rating.dataset?.rating) || 0
		};
	});

	await browser.close();

	const { beverages } = await getDbCollections();

	await beverages.updateOne(
		{ shortId: beverageShortId },
		{
			$set: {
				'editorial.ratings.untappd.quantity': rating.quantity,
				'editorial.ratings.untappd.value': rating.value,
				'editorial.ratings.untappd.date': new Date()
			}
		}
	);

	return true;
}

export default updateUntappdRating;
