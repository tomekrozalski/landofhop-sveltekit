import { getDbCollections } from '$lib/utils/api';
import type { RawStylesWithoutId } from '$lib/utils/types/api/RawStyles.d';
import type { RawIngredientTag } from '$lib/utils/types/api/RawBeverage/RawIngredientTag.d';

export async function put({ locals, params, request }) {
	const { badge } = params;
	const styleData = await request.json();

	if (!locals.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot update styles'
			}
		};
	}

	const { beverages, styles } = await getDbCollections();

	await styles.replaceOne({ badge }, styleData as RawStylesWithoutId);

	const beveragesWithStyle = await beverages
		.find({ 'editorial.brewing.styleTags.badge': badge })
		.toArray();

	beveragesWithStyle.forEach(async ({ _id, editorial }) => {
		const styleTags = editorial.brewing.styleTags as RawIngredientTag[];
		const updatedStyleTags = styleTags.map((props) => (props.badge === badge ? styleData : props));

		await beverages.updateOne(
			{ _id },
			{ $set: { 'editorial.brewing.styleTags': updatedStyleTags } }
		);
	});

	const data: RawStylesWithoutId[] = await styles
		.find(
			{},
			{
				projection: {
					_id: 0,
					badge: 1,
					name: 1,
					group: 1
				}
			}
		)
		.toArray();

	return { body: data };
}
