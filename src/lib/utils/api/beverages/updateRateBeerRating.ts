import { getDbCollections } from '$lib/utils/api';

async function updateRateBeerRating(rateBeerid: string, beverageShortId: string) {
	try {
		const response = await fetch('https://beta.ratebeer.com/v1/api/graphql/', {
			method: 'POST',
			body: JSON.stringify({
				query: 'query beer($beerId: ID!) { beer(id: $beerId) { averageQuickRating ratingsCount }}',
				variables: {
					beerId: rateBeerid
				}
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const { data } = await response.json();
		const { beverages } = await getDbCollections();

		const quantity = data.beer.ratingsCount;
		const value = Number((Math.round(data.beer.averageQuickRating * 100000) / 100000).toFixed(5));

		await beverages.updateOne(
			{ shortId: beverageShortId },
			{
				$set: {
					'editorial.ratings.rateBeer.quantity': quantity,
					'editorial.ratings.rateBeer.value': value,
					'editorial.ratings.rateBeer.date': new Date()
				}
			}
		);

		return { quantity, value };
	} catch (e) {
		console.error(e.message);
		return null;
	}
}

export default updateRateBeerRating;
