import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { saveViewFromAboveJpg, saveViewFromAboveWebp } from '$lib/utils/api';
import authentication from '$lib/utils/stores/authentication';
import { beverages } from '$db/mongo';

export const POST: RequestHandler = async ({ params, request }) => {
	const data = await request.formData();
	const { badge, brand, shortId } = params;
	const imageFiles = data.get('image');
	const images = await imageFiles.arrayBuffer();
	const image = Buffer.from(images);
	const path = `${brand}/${badge}/${shortId}`;

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot add beverage view from above photo');
	}

	await Promise.all([
		saveViewFromAboveWebp(path, image, 'large'),
		saveViewFromAboveWebp(path, image, 'big'),
		saveViewFromAboveWebp(path, image, 'small'),
		saveViewFromAboveJpg(path, image, 'large'),
		saveViewFromAboveJpg(path, image, 'big'),
		saveViewFromAboveJpg(path, image, 'small')
	]);

	await beverages.updateOne({ shortId }, { $set: { 'editorial.photos.viewFromAbove': true } });
	const updatedData = await beverages.findOne({ shortId });

	const formattedData = {
		...updatedData.editorial.photos,
		type: updatedData.label.container.type
	};

	return json(formattedData);
};
