import sizeOf from 'buffer-image-size';
import { getDbCollections, getTracedSvg, saveCoverJpg, saveCoverWebp } from '$lib/utils/api';

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
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot add beverage cover'
			}
		};
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

	const { basics, beverages } = await getDbCollections();

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

	return { body: formattedData };
}
