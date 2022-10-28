import { format } from 'date-fns';
import { translate } from '$lib/utils/api';
import { AppLanguage, DateFormat } from '$types/enums/Globals.enum';
import type { RawBeverage } from '$types/RawBeverage.d';
import type { Basics } from '$lib/templates/BeverageList/Basics.d';

function formatBeveragesToBasics(beverages: RawBeverage[], language: AppLanguage): Basics[] {
	return beverages.map(({ added, badge, editorial, label, shortId }) => ({
		added: format(new Date(added), DateFormat.pl),
		badge,
		brand: {
			badge: label.general.brand.badge,
			name: translate(label.general.brand.name, language)
		},
		containerType: label.container.type,
		...(editorial?.photos?.cover &&
			editorial?.photos?.outlines?.cover && {
				coverImage: {
					height: editorial.photos.cover.height,
					width: editorial.photos.cover.width,
					outline: editorial.photos.outlines.cover
				}
			}),
		name: translate(label.general.name, language),
		shortId
	}));
}

export default formatBeveragesToBasics;
