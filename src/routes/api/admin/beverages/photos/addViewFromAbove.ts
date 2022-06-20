import { getDbCollections, saveViewFromAboveJpg, saveViewFromAboveWebp } from '$lib/utils/api';

export async function post({ locals, request }) {
	const data = await request.formData();
	const badge = data.get('badge');
	const brand = data.get('brand');
	const imageFiles = data.get('image');
	const images = await imageFiles.arrayBuffer();
	const image = Buffer.from(images);
	const shortId = data.get('shortId');
	const path = `${brand}/${badge}/${shortId}`;

	if (!locals.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot add beverage view from above photo'
			}
		};
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

	return { body: formattedData };
}
