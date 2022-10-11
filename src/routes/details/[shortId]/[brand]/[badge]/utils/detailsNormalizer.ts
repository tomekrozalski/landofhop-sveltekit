import { isBoolean, isEmpty, isNumber } from 'lodash-es';
import { format } from 'date-fns';
import { deleteIfEmpty, translate } from '$lib/utils/api';
import { DateFormat } from '$lib/utils/enums/DateFormat.enum';
import { AppLanguage } from '$lib/utils/enums/AppLanguage.enum';
import type { RawBeverage } from '$types/api/RawBeverage/RawBeverage.d';
import type { Details } from '$types/Beverage/Details';
import type { RawInstitution } from '$types/api/RawBeverage/RawInstitution';
import type { Institution } from '$types/Beverage/fragments/Institution';
import countryList from './countryList';

function detailsNormalizer(beverage: RawBeverage, desiredLanguage: AppLanguage): Details {
	const countries = desiredLanguage === AppLanguage.pl ? countryList.pl : countryList.en;

	function formatIntitution({ badge, name, shortId, owner }: RawInstitution): Institution {
		return {
			badge,
			name: translate(name, desiredLanguage),
			...(owner && {
				owner: formatIntitution(owner)
			}),
			shortId
		};
	}

	const formattedObject = {
		shortId: beverage.shortId,
		badge: beverage.badge,
		name: translate(beverage.label.general.name, desiredLanguage),
		series: {
			...(beverage.label.general.series && {
				label: beverage.label.general.series
			}),
			...(beverage.producer?.general?.series && {
				producer: beverage.producer.general.series
			}),
			...(beverage.editorial?.general?.series && {
				editorial: beverage.editorial.general.series
			})
		},
		brand: formatIntitution(beverage.label.general.brand),
		cooperation: {
			...(beverage.label.general.cooperation?.length && {
				label: beverage.label.general.cooperation?.map(formatIntitution)
			}),
			...(beverage.producer?.general?.cooperation?.length && {
				producer: beverage.producer.general.cooperation.map(formatIntitution)
			}),
			...(beverage.editorial?.general?.cooperation?.length && {
				editorial: beverage.editorial.general.cooperation.map(formatIntitution)
			})
		},
		contract: {
			...(beverage.label.general.contract && {
				label: formatIntitution(beverage.label.general.contract)
			}),
			...(beverage.producer?.general?.contract && {
				producer: formatIntitution(beverage.producer.general.contract)
			}),
			...(beverage.editorial?.general?.contract && {
				editorial: formatIntitution(beverage.editorial.general.contract)
			})
		},
		isContract: {
			...(isBoolean(beverage.label.general.isContract) && {
				label: beverage.label.general.isContract
			}),
			...(isBoolean(beverage.producer?.general?.isContract) && {
				producer: beverage.producer?.general?.isContract
			}),
			...(isBoolean(beverage.editorial?.general?.isContract) && {
				editorial: beverage.editorial?.general?.isContract
			})
		},
		place: {
			...(beverage.label.general.place?.city && {
				label: {
					city: translate(beverage.label.general.place.city, desiredLanguage),
					country: countries[beverage.label.general.place.country]
				}
			}),
			...(beverage.producer?.general?.place?.city && {
				producer: {
					city: translate(beverage.producer.general.place.city, desiredLanguage),
					country: countries[beverage.producer.general.place.country]
				}
			}),
			...(beverage.editorial?.general?.place?.city && {
				editorial: {
					city: translate(beverage.editorial.general.place.city, desiredLanguage),
					country: countries[beverage.editorial.general.place.country]
				}
			})
		},
		remark: {
			...(beverage.label.general.remark && {
				label: translate(beverage.label.general.remark, desiredLanguage)
			}),
			...(beverage.producer?.general?.remark && {
				producer: translate(beverage.producer.general.remark, desiredLanguage)
			}),
			...(beverage.editorial?.general?.remark && {
				editorial: translate(beverage.editorial.general.remark, desiredLanguage)
			})
		},
		tale: {
			...(beverage.label.general.tale && {
				label: beverage.label.general.tale
			}),
			...(beverage.producer?.general?.tale && {
				producer: translate(beverage.producer.general.tale, desiredLanguage)
			})
		},
		...(beverage.label.general.barcode && {
			barcode: beverage.label.general.barcode
		}),
		fermentation: {
			...(beverage.label.brewing?.fermentation?.length && {
				label: beverage.label.brewing.fermentation
			}),
			...(beverage.producer?.brewing?.fermentation?.length && {
				producer: beverage.producer.brewing.fermentation
			}),
			...(beverage.editorial?.brewing?.fermentation?.length && {
				editorial: beverage.editorial.brewing.fermentation
			})
		},
		extract: {
			...(beverage.label.brewing?.extract && {
				label: {
					relate: beverage.label.brewing.extract.relate,
					unit: beverage.label.brewing.extract.unit,
					value: +beverage.label.brewing.extract.value
				}
			}),
			...(beverage.producer?.brewing?.extract && {
				producer: {
					relate: beverage.producer.brewing.extract.relate,
					unit: beverage.producer.brewing.extract.unit,
					value: +beverage.producer.brewing.extract.value
				}
			})
		},
		alcohol: {
			...(beverage.label.brewing?.alcohol && {
				label: {
					relate: beverage.label.brewing.alcohol.relate,
					unit: beverage.label.brewing.alcohol.unit,
					value: +beverage.label.brewing.alcohol.value,
					...(beverage.label.brewing.alcohol.scope && {
						scope: beverage.label.brewing.alcohol.scope
					})
				}
			}),
			...(beverage.producer?.brewing?.alcohol && {
				producer: {
					relate: beverage.producer.brewing.alcohol.relate,
					unit: beverage.producer.brewing.alcohol.unit,
					value: +beverage.producer.brewing.alcohol.value,
					...(beverage.producer.brewing.alcohol.scope && {
						scope: beverage.producer.brewing.alcohol.scope
					})
				}
			}),
			...(beverage.editorial?.brewing?.alcohol?.scope && {
				editorial: {
					scope: beverage.editorial.brewing.alcohol.scope
				}
			})
		},
		filtration: {
			...(isBoolean(beverage.label.brewing?.filtration) && {
				label: beverage.label.brewing?.filtration
			}),
			...(isBoolean(beverage.producer?.brewing?.filtration) && {
				producer: beverage.producer?.brewing?.filtration
			}),
			...(isBoolean(beverage.editorial?.brewing?.filtration) && {
				editorial: beverage.editorial?.brewing?.filtration
			})
		},
		pasteurization: {
			...(isBoolean(beverage.label.brewing?.pasteurization) && {
				label: beverage.label.brewing?.pasteurization
			}),
			...(isBoolean(beverage.producer?.brewing?.pasteurization) && {
				producer: beverage.producer?.brewing?.pasteurization
			}),
			...(isBoolean(beverage.editorial?.brewing?.pasteurization) && {
				editorial: beverage.editorial?.brewing?.pasteurization
			})
		},
		isAged: {
			...(beverage.label.brewing?.aged?.length &&
				isEmpty(beverage.label.brewing.aged[0]) && { label: true }),
			...(beverage.producer?.brewing?.aged?.length &&
				isEmpty(beverage.producer.brewing.aged[0]) && {
					producer: true
				}),
			...(beverage.editorial?.brewing?.aged?.length &&
				isEmpty(beverage.editorial.brewing.aged[0]) && {
					editorial: true
				})
		},
		aged: {
			...(beverage.label.brewing?.aged?.length &&
				(beverage.label.brewing?.aged.length !== 1 || !isEmpty(beverage.label.brewing.aged[0])) && {
					label: beverage.label.brewing.aged
				}),
			...(beverage.producer?.brewing?.aged?.length &&
				(beverage.producer.brewing?.aged.length !== 1 ||
					!isEmpty(beverage.producer.brewing.aged[0])) && {
					producer: beverage.producer.brewing.aged
				}),
			...(beverage.editorial?.brewing?.aged?.length &&
				(beverage.editorial.brewing?.aged.length !== 1 ||
					!isEmpty(beverage.editorial.brewing.aged[0])) && {
					editorial: beverage.editorial.brewing.aged
				})
		},
		style: {
			...(beverage.label.brewing?.style?.length && {
				label: beverage.label.brewing.style
			}),
			...(beverage.producer?.brewing?.style?.length && {
				producer: beverage.producer.brewing.style
			})
		},
		...(beverage.editorial?.brewing?.styleTags && {
			styleTags: {
				editorial: beverage.editorial.brewing.styleTags.map((props) => ({
					...props,
					name: translate(props.name, desiredLanguage)
				}))
			}
		}),
		isDryHopped: {
			...(beverage.label.brewing?.isDryHopped &&
				!beverage.label.brewing?.dryHopped?.length && { label: true }),
			...(beverage.producer?.brewing?.isDryHopped &&
				!beverage.producer.brewing?.dryHopped?.length && { producer: true }),
			...(beverage.editorial?.brewing?.isDryHopped &&
				!beverage.editorial.brewing?.dryHopped?.length && { editorial: true })
		},
		dryHopped: {
			...(beverage.label.brewing?.dryHopped?.length && {
				label: beverage.label.brewing.dryHopped.map((hop) => ({
					...hop,
					name: translate(hop.name, desiredLanguage)
				}))
			}),
			...(beverage.producer?.brewing?.dryHopped?.length && {
				producer: beverage.producer.brewing.dryHopped.map((hop) => ({
					...hop,
					name: translate(hop.name, desiredLanguage)
				}))
			}),
			...(beverage.editorial?.brewing?.dryHopped?.length && {
				editorial: beverage.editorial.brewing.dryHopped.map((hop) => ({
					...hop,
					name: translate(hop.name, desiredLanguage)
				}))
			})
		},
		hopRate: {
			...(beverage.label.brewing?.hopRate && {
				label: {
					unit: beverage.label.brewing.hopRate.unit,
					value: +beverage.label.brewing.hopRate.value
				}
			}),
			...(beverage.producer?.brewing?.hopRate && {
				producer: {
					unit: beverage.producer.brewing.hopRate.unit,
					value: +beverage.producer.brewing.hopRate.value
				}
			})
		},
		nitrogen: {
			...(isBoolean(beverage.label.brewing?.nitrogen) && {
				label: beverage.label.brewing?.nitrogen
			}),
			...(isBoolean(beverage.producer?.brewing?.nitrogen) && {
				producer: beverage.producer?.brewing?.nitrogen
			}),
			...(isBoolean(beverage.editorial?.brewing?.nitrogen) && {
				editorial: beverage.editorial?.brewing?.nitrogen
			})
		},
		expirationDate: {
			...(beverage.label.brewing?.expirationDate && {
				label: beverage.label.brewing.expirationDate
			}),
			...(beverage.producer?.brewing?.expirationDate && {
				producer: beverage.producer.brewing.expirationDate
			})
		},
		ingredients: {
			...(beverage.label.ingredients?.descriptive && {
				label: translate(beverage.label.ingredients.descriptive, desiredLanguage)
			}),
			...(beverage.producer?.ingredients?.descriptive && {
				producer: translate(beverage.producer.ingredients.descriptive, desiredLanguage)
			})
		},
		ingredientsTags: {
			...(beverage.label.ingredients?.tags?.length && {
				label: beverage.label.ingredients.tags.map((ingredient) => ({
					...ingredient,
					name: translate(ingredient.name, desiredLanguage)
				}))
			}),
			...(beverage.producer?.ingredients?.tags?.length && {
				producer: beverage.producer.ingredients.tags.map((ingredient) => ({
					...ingredient,
					name: translate(ingredient.name, desiredLanguage)
				}))
			})
		},
		smokedMalt: {
			...(isBoolean(beverage.label.ingredients?.smokedMalt) && {
				label: beverage.label.ingredients?.smokedMalt
			}),
			...(isBoolean(beverage.producer?.ingredients?.smokedMalt) && {
				producer: beverage.producer?.ingredients?.smokedMalt
			})
		},
		bitterness: {
			...(isNumber(beverage.label.impressions?.bitterness) && {
				label: beverage.label.impressions?.bitterness
			}),
			...(isNumber(beverage.producer?.impressions?.bitterness) && {
				producer: beverage.producer?.impressions?.bitterness
			})
		},
		sweetness: {
			...(isNumber(beverage.label.impressions?.sweetness) && {
				label: beverage.label.impressions?.sweetness
			}),
			...(isNumber(beverage.producer?.impressions?.sweetness) && {
				producer: beverage.producer?.impressions?.sweetness
			})
		},
		fullness: {
			...(isNumber(beverage.label.impressions?.fullness) && {
				label: beverage.label.impressions?.fullness
			}),
			...(isNumber(beverage.producer?.impressions?.fullness) && {
				producer: beverage.producer?.impressions?.fullness
			})
		},
		power: {
			...(isNumber(beverage.label.impressions?.power) && {
				label: beverage.label.impressions?.power
			}),
			...(isNumber(beverage.producer?.impressions?.power) && {
				producer: beverage.producer?.impressions?.power
			})
		},
		hoppyness: {
			...(isNumber(beverage.label.impressions?.hoppyness) && {
				label: beverage.label.impressions?.hoppyness
			}),
			...(isNumber(beverage.producer?.impressions?.hoppyness) && {
				producer: beverage.producer?.impressions?.hoppyness
			})
		},
		temperature: {
			...(beverage.label.impressions?.temperature && {
				label: {
					...beverage.label.impressions.temperature,
					from: +beverage.label.impressions.temperature.from,
					to: +beverage.label.impressions.temperature.to
				}
			}),
			...(beverage.producer?.impressions?.temperature && {
				producer: {
					...beverage.producer.impressions.temperature,
					from: +beverage.producer.impressions.temperature.from,
					to: +beverage.producer.impressions.temperature.to
				}
			})
		},
		color: {
			...(beverage.editorial?.impressions?.color && {
				editorial: beverage.editorial.impressions.color
			})
		},
		clarity: {
			...(beverage.editorial?.impressions?.clarity && {
				editorial: beverage.editorial.impressions.clarity
			})
		},
		ratings: {
			...(beverage.editorial?.ratings?.rateBeer?.quantity && {
				rateBeer: {
					quantity: beverage.editorial.ratings.rateBeer.quantity,
					value: beverage.editorial.ratings.rateBeer.value
				}
			}),
			...(beverage.editorial?.ratings?.untappd?.quantity && {
				untappd: {
					quantity: beverage.editorial.ratings.untappd.quantity,
					value: beverage.editorial.ratings.untappd.value
				}
			}),
			...(beverage.editorial?.ratings?.total?.quantity && {
				total: {
					quantity: beverage.editorial.ratings.total.quantity,
					value: beverage.editorial.ratings.total.value,
					date: format(new Date(beverage.editorial.ratings.total.date), DateFormat[desiredLanguage])
				}
			})
		},
		container: {
			color: beverage.label.container.color,
			material: beverage.label.container.material,
			unit: beverage.label.container.unit,
			type: beverage.label.container.type,
			value: +beverage.label.container.value,
			...(isBoolean(beverage.label.container.hasCork) && {
				hasCork: beverage.label.container.hasCork
			}),
			...(isBoolean(beverage.label.container.hasCapWireFlip) && {
				hasCapWireFlip: beverage.label.container.hasCapWireFlip
			})
		},
		price: {
			...(beverage.label.price?.length && {
				label: beverage.label.price.map(({ value, ...rest }) => ({
					...rest,
					value: +value
				}))
			}),
			...(beverage.producer?.price?.length && {
				producer: beverage.producer.price.map(({ value, ...rest }) => ({
					...rest,
					value: +value
				}))
			}),
			...(beverage.editorial?.price?.length && {
				editorial: beverage.editorial.price.map(({ value, ...rest }) => ({
					...rest,
					value: +value
				}))
			})
		},
		photos: {
			...(beverage.editorial?.photos?.cap && { cap: true }),
			...(beverage.editorial?.photos?.gallery && {
				gallery: beverage.editorial.photos.gallery
			}),
			...(beverage.editorial?.photos?.outlines?.gallery && {
				outline: beverage.editorial.photos.outlines.gallery
			}),
			...(beverage.editorial?.photos?.viewFromAbove && { viewFromAbove: true })
		},
		added: format(new Date(beverage.added), DateFormat[desiredLanguage]),
		...(beverage.updated && {
			updated: format(new Date(beverage.updated), DateFormat[desiredLanguage])
		})
	};

	deleteIfEmpty(
		[
			'series',
			'cooperation',
			'contract',
			'isContract',
			'place',
			'remark',
			'tale.producer',
			'tale',
			'beverageType',
			'fermentation',
			'extract',
			'alcohol',
			'filtration',
			'pasteurization',
			'isAged',
			'aged',
			'style',
			'styleTags',
			'isDryHopped',
			'dryHopped',
			'hopRate',
			'nitrogen',
			'expirationDate',
			'ingredients',
			'ingredientsTags',
			'smokedMalt',
			'bitterness',
			'sweetness',
			'fullness',
			'power',
			'hoppyness',
			'temperature',
			'color',
			'clarity',
			'ratings',
			'price',
			'photos'
		],
		formattedObject
	);

	return formattedObject;
}

export default detailsNormalizer;
