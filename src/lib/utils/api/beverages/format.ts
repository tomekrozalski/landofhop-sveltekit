import { cleanDeep } from '$lib/utils/api';
import type { NewBeverageRequest } from '$types/api/requests/Beverage';
import type { RawCommonBasicsBeverage } from '$types/api/RawBasics.d';
import type { RawBeverageWithoutId } from '$types/api/RawBeverage/RawBeverage.d';
import type { RawEditorialPhotos } from '$types/api/RawBeverage/RawEditorial.d';
import type { RawRatings } from '$types/api/RawBeverage/RawEditorial.d';

function formatBeverage(
	{ editorial, label, producer }: NewBeverageRequest,
	commonProps: RawCommonBasicsBeverage,
	photos?: RawEditorialPhotos,
	ratings?: RawRatings
) {
	return cleanDeep({
		label: {
			general: {
				name: label.name,
				series: label.series,
				brand: label.brand,
				cooperation: label.cooperation,
				contract: label.contract,
				isContract: label.isContract,
				place: label.place,
				remark: label.remark,
				tale: label.tale,
				barcode: label.barcode
			},
			brewing: {
				fermentation: label.fermentation,
				style: label.style,
				extract: label.extract,
				alcohol: label.alcohol,
				filtration: label.filtration,
				pasteurization: label.pasteurization,
				aged: label.aged,
				isDryHopped: label.isDryHopped,
				dryHopped: label.dryHopped,
				hopRate: label.hopRate,
				nitrogen: label.nitrogen,
				expirationDate: label.expirationDate
			},
			ingredients: {
				descriptive: label.ingredients,
				tags: label.ingredientTags,
				smokedMalt: label.smokedMalt
			},
			impressions: {
				bitterness: label.bitterness,
				sweetness: label.sweetness,
				fullness: label.fullness,
				power: label.power,
				hoppyness: label.hoppyness,
				temperature: label.temperature
			},
			container: label.container,
			price: label.price?.map((props) => ({
				...props,
				date: new Date(props.date)
			}))
		},
		producer: {
			general: {
				series: producer?.series,
				cooperation: producer?.cooperation,
				contract: producer?.contract,
				isContract: producer?.isContract,
				place: producer?.place,
				remark: producer?.remark,
				tale: producer?.tale
			},
			brewing: {
				fermentation: producer?.fermentation,
				style: producer?.style,
				extract: producer?.extract,
				alcohol: producer?.alcohol,
				filtration: producer?.filtration,
				pasteurization: producer?.pasteurization,
				aged: producer?.aged,
				isDryHopped: producer?.isDryHopped,
				dryHopped: producer?.dryHopped,
				hopRate: producer?.hopRate,
				nitrogen: producer?.nitrogen,
				expirationDate: producer?.expirationDate
			},
			ingredients: {
				descriptive: producer?.ingredients,
				tags: producer?.ingredientTags,
				smokedMalt: producer?.smokedMalt
			},
			impressions: {
				bitterness: producer?.bitterness,
				sweetness: producer?.sweetness,
				fullness: producer?.fullness,
				power: producer?.power,
				hoppyness: producer?.hoppyness,
				temperature: producer?.temperature
			},
			price: producer?.price?.map((props) => ({
				...props,
				date: new Date(props.date)
			}))
		},
		editorial: {
			general: {
				series: editorial?.series,
				cooperation: editorial?.cooperation,
				contract: editorial?.contract,
				isContract: editorial?.isContract,
				place: editorial?.place,
				remark: editorial?.remark
			},
			brewing: {
				fermentation: editorial?.fermentation,
				styleTags: editorial?.styleTags,
				alcohol: {
					scope: editorial?.alcoholScope
				},
				filtration: editorial?.filtration,
				pasteurization: editorial?.pasteurization,
				aged: editorial?.aged,
				isDryHopped: editorial?.isDryHopped,
				dryHopped: editorial?.dryHopped,
				nitrogen: editorial?.nitrogen
			},
			impressions: {
				color: editorial?.color,
				clarity: editorial?.clarity
			},
			ratings: {
				rateBeer: {
					...(ratings?.rateBeer ?? {}),
					beverageId: editorial?.rateBeer
				},
				untappd: {
					...(ratings?.untappd ?? {}),
					beverageSlug: editorial?.untappd
				},
				...(ratings?.total && { total: ratings.total })
			},
			price: editorial?.price?.map((props) => ({
				...props,
				date: new Date(props.date)
			})),
			...(photos && { photos }),
			notes: editorial?.notes
		},
		...commonProps
	}) as RawBeverageWithoutId;
}

export default formatBeverage;
