import {
	removeGallery,
	getDbCollections,
	getTracedSvg,
	saveGalleryJpg,
	saveGalleryWebp
} from '$lib/utils/api';

export async function post({ locals, request }) {
	const data = await request.formData();
	const badge = data.get('badge');
	const brand = data.get('brand');
	const imageFiles = data.getAll('images');
	const shortId = data.get('shortId');
	const path = `${brand}/${badge}/${shortId}`;

	if (!locals.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot add beverage gallery'
			}
		};
	}

	const { beverages } = await getDbCollections();
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

	return {
		body: {
			...updatedBeverage.editorial.photos,
			type: updatedBeverage.label.container.type
		}
	};
}
