import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import sizeOf from 'buffer-image-size';
import { getTracedSvg, saveCoverJpg, saveCoverWebp } from '$lib/utils/api';
import authentication from '$lib/utils/stores/authentication';
import { basics, beverages } from '$db/mongo';

export const POST: RequestHandler = async ({ params, request }) => {
	const data = await request.formData();
	const { badge, brand, shortId } = params;
	const imageFiles = data.get('image');
	const images = await imageFiles.arrayBuffer();
	const image = Buffer.from(images);

	const path = `${brand}/${badge}/${shortId}`;

	if (!badge || !brand || !shortId || !images || !get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot add beverage cover');
	}

	await Promise.all([
		saveCoverWebp(path, image, 'large'),
		saveCoverWebp(path, image, 'big'),
		saveCoverWebp(path, image, 'small'),
		saveCoverJpg(path, image, 'large'),
		saveCoverJpg(path, image, 'big'),
		saveCoverJpg(path, image, 'small')
	]);

	const outlines = await getTracedSvg(image);
	const { height, width } = sizeOf(image);

	await beverages.updateOne(
		{ shortId },
		{
			$set: {
				'editorial.photos.cover.height': height,
				'editorial.photos.cover.width': width,
				'editorial.photos.outlines.cover': outlines
			}
		}
	);

	await basics.updateOne(
		{ shortId },
		{
			$set: {
				coverImage: {
					height,
					outlines,
					width
				}
			}
		}
	);

	const updatedData = await beverages.findOne({ shortId });

	const formattedData = {
		...(updatedData.editorial?.photos && { ...updatedData.editorial.photos }),
		type: updatedData.label.container.type
	};

	return json(formattedData);
};
