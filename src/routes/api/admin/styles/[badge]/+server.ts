import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import authentication from '$lib/utils/stores/authentication';
import { beverages, styles } from '$db/mongo';
import type { RawStyle } from '$types/RawStyle.d';
import type { LanguageValue } from '$types/LanguageValue.d';
import type { IngredientType } from '$types/enums/Beverage.enum';

export const PUT: RequestHandler = async ({ params, request }) => {
	const badge = params.badge ?? '';
	const styleData = await request.json();

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot update styles');
	}

	await styles.replaceOne({ badge }, styleData as RawStyle);

	const beveragesWithStyle = await beverages
		.find({ 'editorial.brewing.styleTags.badge': badge })
		.toArray();

	beveragesWithStyle.forEach(async ({ _id, editorial }) => {
		const styleTags = editorial?.brewing?.styleTags as {
			badge: string;
			name: LanguageValue[];
			type: IngredientType;
		}[];
		const updatedStyleTags = styleTags.map((props) => (props.badge === badge ? styleData : props));

		await beverages.updateOne(
			{ _id },
			{ $set: { 'editorial.brewing.styleTags': updatedStyleTags } }
		);
	});

	const data: RawStyle[] = await styles
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

	return json(data);
};
