import puppeteer from 'puppeteer';
import { beverages } from '$db/mongo';

const updateUntappdRating = async (untappBeerSlug: string, beverageShortId: string) => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(`https://untappd.com/b${untappBeerSlug}`);

		const { quantity, value } = await page.evaluate(() => {
			const rating: HTMLElement | null = document.querySelector('.details .caps');
			const raters: HTMLElement | null = document.querySelector('.details .raters');

			if (!rating || !raters || !rating.dataset?.rating || rating.dataset.rating === '0') {
				return {
					quantity: 0,
					value: 0
				};
			}

			return {
				quantity: Number((raters as HTMLElement).textContent?.replace(/\D/g, '')) || 0,
				value: Number(rating.dataset?.rating) || 0
			};
		});

		await browser.close();

		await beverages.updateOne(
			{ shortId: beverageShortId },
			{
				$set: {
					'editorial.ratings.untappd.quantity': quantity,
					'editorial.ratings.untappd.value': value,
					'editorial.ratings.untappd.date': new Date()
				}
			}
		);

		return { quantity, value };
	} catch (e) {
		console.error(e.message);
		return null;
	}
};

export default updateUntappdRating;
