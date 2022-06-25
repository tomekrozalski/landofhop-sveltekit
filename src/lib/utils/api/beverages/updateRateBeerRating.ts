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

		await beverages.updateOne(
			{ shortId: beverageShortId },
			{
				$set: {
					'editorial.ratings.rateBeer.quantity': data.beer.ratingsCount,
					'editorial.ratings.rateBeer.value': Number(
						(Math.round(data.beer.averageQuickRating * 100000) / 100000).toFixed(5)
					)
				}
			}
		);

		return true;
	} catch (e) {
		console.error(e.message);
		return false;
	}
}

export default updateRateBeerRating;
