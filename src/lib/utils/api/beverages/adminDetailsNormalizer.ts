import { format } from 'date-fns';

import { AgedTimeUnit } from '$lib/utils/enums/Beverage.enum';
import { DateFormat } from '$lib/utils/enums/DateFormat.enum';
import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import type { RawBeverage } from '$lib/utils/types/api/RawBeverage/RawBeverage.d';
import type { RawPrice } from '$lib/utils/types/api/RawBeverage/RawPrice';
import type { RawTale } from '$lib/utils/types/api/RawBeverage/RawTale';
import type { LabelFormValues } from '$lib/dashboard/beverage/label/LabelFormValues';
import type { ProducerFormValues } from '$lib/dashboard/beverage/producer/ProducerFormValues';
import type { EditorialFormValues } from '$lib/dashboard/beverage/editorial/EditorialFormValues';

function adminDetailsNormalizer(
	beverage: RawBeverage
): {
	label: LabelFormValues;
	producer: ProducerFormValues;
	editorial: EditorialFormValues;
} {
	function normalizeLanguageValue({ language, value }: LanguageValue) {
		return {
			language: language ?? '--',
			value
		};
	}

	function normalizePrice({
		currency,
		date,
		shop,
		value
	}: RawPrice): {
		currency: string;
		date: string;
		shop: string | null;
		value: string;
	} {
		return {
			currency,
			date: format(new Date(date), DateFormat.pl),
			shop: shop ?? null,
			value: value.toString()
		};
	}

	function normalizeTale({ article, language, lead }: RawTale) {
		return {
			article: article ?? '',
			language: language ?? '--',
			lead
		};
	}

	const formattedObject = {
		label: {
			badge: beverage.badge,
			// -----------
			name: beverage.label.general.name.map(normalizeLanguageValue),
			series: beverage.label.general?.series?.map(normalizeLanguageValue) ?? [],
			brand: beverage.label.general.brand.shortId,
			cooperation: beverage.label.general?.cooperation?.map(({ shortId }) => shortId) ?? null,
			contract:
				beverage.label.general?.contract?.shortId ??
				(beverage.label.general?.isContract ? '--' : null),
			place: beverage.label.general?.place?.shortId ?? null,
			remark: beverage.label.general?.remark?.map(normalizeLanguageValue) ?? [],
			tale: beverage.label.general?.tale?.map(normalizeTale) ?? [],
			barcode: beverage.label.general?.barcode ?? null,
			// -----------
			fermentation: beverage.label.brewing?.fermentation ?? null,
			style: beverage.label.brewing?.style?.map(normalizeLanguageValue) ?? [],
			extract: {
				value: beverage.label.brewing?.extract?.value?.toString() ?? null,
				unit: beverage.label.brewing?.extract?.unit ?? null,
				relate: beverage.label.brewing?.extract?.relate ?? null
			},
			alcohol: {
				value: beverage.label.brewing?.alcohol?.value?.toString() ?? null,
				unit: beverage.label.brewing?.alcohol?.unit ?? null,
				relate: beverage.label.brewing?.alcohol?.relate ?? null,
				scope:
					beverage.label.brewing?.alcohol?.scope ??
					((beverage.label.brewing?.alcohol ? '--' : null) as '--' | null)
			},
			filtration: beverage.label.brewing?.filtration ?? null,
			pasteurization: beverage.label.brewing?.pasteurization ?? null,
			aged:
				beverage.label.brewing?.aged?.map((props) => ({
					type: props.type ?? null,
					wood: props.wood ?? null,
					time: {
						value: props.time?.value?.toString() ?? '0',
						unit: props.time?.unit ?? AgedTimeUnit.month
					},
					previousContent: props.previousContent ?? []
				})) ?? [],
			dryHopped:
				beverage.label.brewing?.dryHopped?.map(({ badge }) => badge) ??
				(beverage.label.brewing?.isDryHopped ? [] : null),
			hopRate: {
				value: beverage.label.brewing?.hopRate?.value?.toString() ?? null,
				unit: beverage.label.brewing?.hopRate?.unit ?? null
			},
			nitrogen: beverage.label.brewing?.nitrogen ?? null,
			expirationDate: {
				value: beverage.label.brewing?.expirationDate?.value?.toString() ?? null,
				unit: beverage.label.brewing?.expirationDate?.unit ?? null
			},
			// -----------
			ingredients: beverage.label.ingredients?.descriptive ?? [],
			ingredientTags: beverage.label.ingredients?.tags?.map(({ badge }) => badge) ?? null,
			smokedMalt: beverage.label.ingredients?.smokedMalt ?? null,
			// -----------
			bitterness: beverage.label.impressions?.bitterness?.toString() ?? null,
			sweetness: beverage.label.impressions?.sweetness?.toString() ?? null,
			fullness: beverage.label.impressions?.fullness?.toString() ?? null,
			power: beverage.label.impressions?.power?.toString() ?? null,
			hoppyness: beverage.label.impressions?.hoppyness?.toString() ?? null,
			temperature: {
				from: beverage.label.impressions?.temperature?.from?.toString() ?? null,
				to: beverage.label.impressions?.temperature?.to?.toString() ?? null,
				unit: beverage.label.impressions?.temperature?.unit ?? null
			},
			// -----------
			container: {
				color: beverage.label.container.color,
				hasCapWireFlip: beverage.label.container.hasCapWireFlip ?? false,
				hasCork: beverage.label.container.hasCork ?? false,
				material: beverage.label.container.material,
				type: beverage.label.container.type,
				unit: beverage.label.container.unit,
				value: beverage.label.container.value?.toString()
			},
			price: beverage.label.price?.map(normalizePrice) ?? []
		},
		producer: {
			series: beverage.producer?.general?.series?.map(normalizeLanguageValue) ?? [],
			cooperation: beverage.producer?.general?.cooperation?.map(({ shortId }) => shortId) ?? null,
			contract:
				beverage.producer?.general?.contract?.shortId ??
				(beverage.producer?.general?.isContract ? '--' : null),
			place: beverage.producer?.general?.place?.shortId ?? null,
			remark: beverage.producer?.general?.remark?.map(normalizeLanguageValue) ?? [],
			tale: beverage.producer?.general?.tale?.map(normalizeTale) ?? [],
			// -----------
			fermentation: beverage.producer?.brewing?.fermentation ?? null,
			style: beverage.producer?.brewing?.style?.map(normalizeLanguageValue) ?? [],
			extract: {
				value: beverage.producer?.brewing?.extract?.value?.toString() ?? null,
				unit: beverage.producer?.brewing?.extract?.unit ?? null,
				relate: beverage.producer?.brewing?.extract?.relate ?? null
			},
			alcohol: {
				value: beverage.producer?.brewing?.alcohol?.value?.toString() ?? null,
				unit: beverage.producer?.brewing?.alcohol?.unit ?? null,
				relate: beverage.producer?.brewing?.alcohol?.relate ?? null,
				scope: beverage.producer?.brewing?.alcohol?.scope ?? null
			},
			filtration: beverage.producer?.brewing?.filtration ?? null,
			pasteurization: beverage.producer?.brewing?.pasteurization ?? null,
			aged:
				beverage.producer?.brewing?.aged?.map((props) => ({
					type: props.type ?? null,
					wood: props.wood ?? null,
					time: {
						value: props.time?.value?.toString() ?? '0',
						unit: props.time?.unit ?? AgedTimeUnit.month
					},
					previousContent: props.previousContent ?? []
				})) ?? [],
			dryHopped:
				beverage.producer?.brewing?.dryHopped?.map(({ badge }) => badge) ??
				(beverage.producer?.brewing?.isDryHopped ? [] : null),
			hopRate: {
				value: beverage.producer?.brewing?.hopRate?.value?.toString() ?? null,
				unit: beverage.producer?.brewing?.hopRate?.unit ?? null
			},
			nitrogen: beverage.producer?.brewing?.nitrogen ?? null,
			expirationDate: {
				value: beverage.producer?.brewing?.expirationDate?.value?.toString() ?? null,
				unit: beverage.producer?.brewing?.expirationDate?.unit ?? null
			},
			// -----------
			ingredients: beverage.producer?.ingredients?.descriptive ?? [],
			ingredientTags: beverage.producer?.ingredients?.tags?.map(({ badge }) => badge) ?? null,
			smokedMalt: beverage.producer?.ingredients?.smokedMalt ?? null,
			// -----------
			bitterness: beverage.producer?.impressions?.bitterness?.toString() ?? null,
			sweetness: beverage.producer?.impressions?.sweetness?.toString() ?? null,
			fullness: beverage.producer?.impressions?.fullness?.toString() ?? null,
			power: beverage.producer?.impressions?.power?.toString() ?? null,
			hoppyness: beverage.producer?.impressions?.hoppyness?.toString() ?? null,
			temperature: {
				from: beverage.producer?.impressions?.temperature?.from?.toString() ?? null,
				to: beverage.producer?.impressions?.temperature?.to?.toString() ?? null,
				unit: beverage.producer?.impressions?.temperature?.unit ?? null
			},
			// -----------
			price: beverage.producer?.price?.map(normalizePrice) ?? []
		},
		editorial: {
			series: beverage.editorial?.general?.series?.map(normalizeLanguageValue) ?? [],
			cooperation: beverage.editorial?.general?.cooperation?.map(({ shortId }) => shortId) ?? null,
			contract:
				beverage.editorial?.general?.contract?.shortId ??
				(beverage.editorial?.general?.isContract ? '--' : null),
			place: beverage.editorial?.general?.place?.shortId ?? null,
			remark: beverage.editorial?.general?.remark?.map(normalizeLanguageValue) ?? [],
			// -----------
			fermentation: beverage.editorial?.brewing?.fermentation ?? null,
			styleTags: beverage.editorial?.brewing?.styleTags?.map(({ badge }) => badge) ?? null,
			alcoholScope: beverage.editorial?.brewing?.alcohol?.scope ?? null,
			filtration: beverage.editorial?.brewing?.filtration ?? null,
			pasteurization: beverage.editorial?.brewing?.pasteurization ?? null,
			aged:
				beverage.editorial?.brewing?.aged?.map((props) => ({
					type: props.type ?? null,
					wood: props.wood ?? null,
					time: {
						value: props.time?.value?.toString() ?? '0',
						unit: props.time?.unit ?? AgedTimeUnit.month
					},
					previousContent: props.previousContent ?? []
				})) ?? [],
			dryHopped:
				beverage.editorial?.brewing?.dryHopped?.map(({ badge }) => badge) ??
				(beverage.editorial?.brewing?.isDryHopped ? [] : null),
			nitrogen: beverage.editorial?.brewing?.nitrogen ?? null,
			// -----------
			color: beverage.editorial?.impressions?.color ?? null,
			clarity: beverage.editorial?.impressions?.clarity ?? null,
			// -----------
			rateBeer: beverage.editorial?.ratings?.rateBeer?.beverageId ?? null,
			untappd: beverage.editorial?.ratings?.untappd?.beverageSlug ?? null,
			// -----------
			price: beverage.editorial?.price?.map(normalizePrice) ?? [],
			notes: beverage.editorial?.notes ?? null
		}
	};

	return formattedObject;
}

export default adminDetailsNormalizer;
