import { getDbCollections } from '$lib/utils/api';
import { translate } from '$lib/utils/api';
import { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';

export async function post({ request }) {
	const requestData = await request.json();
	const language = requestData.language ?? AppLanguage.en;
	const parent = requestData.parent;

	const { ingredients } = await getDbCollections();

	const rawData: {
		badge: string;
		name: LanguageValue;
	}[] = [];

	await ingredients.find().forEach((props) => {
		if (props.parent === parent) {
			rawData.push({
				badge: props.badge,
				name: translate(props.name, language)
			});
		}
	});

	// 	await beverages
	// 		.find(
	// 			{},
	// 			{
	// 				projection: {
	// 					styleTags: '$editorial.brewing.styleTags'
	// 				}
	// 			}
	// 		)
	// 		.forEach(({ styleTags }: { _id: string; styleTags?: RawStyleTag[] }) => {
	// 			if (styleTags?.length) {
	// 				styleTags.forEach((styleTag: RawStyleTag) => {
	// 					const index = rawData.findIndex(({ badge }) => badge === styleTag.badge);
	//
	// 					rawData[index].amount += 1;
	// 				});
	// 			}
	// 		});

	return {
		body: rawData
	};
}
