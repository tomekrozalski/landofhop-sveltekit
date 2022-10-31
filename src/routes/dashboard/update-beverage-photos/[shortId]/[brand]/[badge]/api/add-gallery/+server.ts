import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { removeGallery, getTracedSvg, saveGalleryJpg, saveGalleryWebp } from '$lib/utils/api';
import authentication from '$lib/utils/stores/authentication';
import { beverages } from '$db/mongo';

export const POST: RequestHandler = async ({ params, request }) => {
	const data = await request.formData();
	const { badge, brand, shortId } = params;
	const imageFiles = data.getAll('images');
	const path = `${brand}/${badge}/${shortId}`;

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot add beverage gallery');
	}

	const beverageToUpdate = await beverages.findOne({ shortId });
	const removeCount = beverageToUpdate.editorial?.photos?.gallery ?? 0;

	if (removeCount) {
		await removeGallery(path, removeCount);
	}

	let index = 1;
	const operations = [];
	let outlines;

	for await (const part of imageFiles) {
		const imageRaw = await part.arrayBuffer();
		const image = Buffer.from(imageRaw);
		const fileName = index.toString().padStart(2, '0');

		if (index === 1) {
			outlines = await getTracedSvg(image);
		}

		const imageSet = [
			saveGalleryJpg(path, image, 'large', fileName),
			saveGalleryJpg(path, image, 'big', fileName),
			saveGalleryJpg(path, image, 'small', fileName),
			saveGalleryWebp(path, image, 'large', fileName),
			saveGalleryWebp(path, image, 'big', fileName),
			saveGalleryWebp(path, image, 'small', fileName)
		];

		operations.push(...imageSet);
		index = index + 1;
	}

	await Promise.all(operations);

	await beverages.updateOne(
		{ shortId },
		{
			$set: {
				'editorial.photos.gallery': imageFiles.length,
				'editorial.photos.outlines.gallery': outlines
			}
		}
	);

	const updatedBeverage = await beverages.findOne({ shortId });

	return json({
		...updatedBeverage.editorial.photos,
		type: updatedBeverage.label.container.type
	});
};
