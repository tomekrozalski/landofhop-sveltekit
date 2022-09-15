import { json } from '@sveltejs/kit';
import { getDbCollections, saveViewFromAboveJpg, saveViewFromAboveWebp } from '$lib/utils/api';

export async function POST({ locals, request }) {
	const data = await request.formData();
	const badge = data.get('badge');
	const brand = data.get('brand');
	const imageFiles = data.get('image');
	const images = await imageFiles.arrayBuffer();
	const image = Buffer.from(images);
	const shortId = data.get('shortId');
	const path = `${brand}/${badge}/${shortId}`;

	if (!locals.authenticated) {
		return json({
			message: 'Unauthorized. Cannot add beverage view from above photo'
		}, {
			status: 401
		});
	}

	await Promise.all([
		saveViewFromAboveWebp(path, image, 'large'),
		saveViewFromAboveWebp(path, image, 'big'),
		saveViewFromAboveWebp(path, image, 'small'),
		saveViewFromAboveJpg(path, image, 'large'),
		saveViewFromAboveJpg(path, image, 'big'),
		saveViewFromAboveJpg(path, image, 'small')
	]);

	const { beverages } = await getDbCollections();
	await beverages.updateOne({ shortId }, { $set: { 'editorial.photos.viewFromAbove': true } });
	const updatedData = await beverages.findOne({ shortId });

	const formattedData = {
		...updatedData.editorial.photos,
		type: updatedData.label.container.type
	};

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
	// Suggestion (check for correctness before using):
	// return json(formattedData);
	return { body: formattedData };
}
