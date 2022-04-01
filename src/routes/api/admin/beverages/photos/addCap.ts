import { authenticate, getDbCollections, saveCapJpg, saveCapWebp } from '$lib/utils/api';

export async function post({ request }) {
	const data = await request.formData();
	const badge = data.get('badge');
	const brand = data.get('brand');
	const imageFiles = data.get('image');
	const images = await imageFiles.arrayBuffer();
	const image = Buffer.from(images);
	const shortId = data.get('shortId');
	const path = `${brand}/${badge}/${shortId}`;

	const [isAuthenticated, headers] = await authenticate(request);

	if (!isAuthenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot add new beverage'
			}
		};
	}

	await Promise.all([
		saveCapWebp(path, image, 'large'),
		saveCapWebp(path, image, 'big'),
		saveCapWebp(path, image, 'small'),
		saveCapJpg(path, image, 'large'),
		saveCapJpg(path, image, 'big'),
		saveCapJpg(path, image, 'small')
	]);

	const { beverages } = await getDbCollections();
	await beverages.updateOne({ shortId }, { $set: { 'editorial.photos.cap': true } });
	const updatedData = await beverages.findOne({ shortId });

	const formattedData = {
		...updatedData.editorial.photos,
		type: updatedData.label.container.type
	};

	return {
		headers,
		body: formattedData
	};
}
