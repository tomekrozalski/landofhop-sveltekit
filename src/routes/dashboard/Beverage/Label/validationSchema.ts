import * as yup from 'yup';
import { AgedType, AgedWood, AgedTimeUnit, Fermentation } from '$types/enums/Beverage.enum';
import type { Translate } from '$types/Translate.d';
import { isValidDate } from '$dashboard/utils/isValidDate';

export function getValidationSchema(translate: Translate) {
	return yup.object().shape({
		badge: yup
			.string()
			.min(3, translate('form.validation.minChars', { value: 3 }))
			.matches(/^[a-z\d-]+$/, translate('form.validation.badge'))
			.required(translate('form.validation.required')),
		// -----------
		name: yup
			.array()
			.of(
				yup.object().shape({
					language: yup.string().required(translate('form.validation.required')),
					value: yup.string().required(translate('form.validation.required'))
				})
			)
			.required()
			.min(1),
		series: yup.array().of(
			yup.object().shape({
				language: yup.string().required(translate('form.validation.required')),
				value: yup.string().required(translate('form.validation.required'))
			})
		),
		brand: yup.string().required(translate('form.validation.required')),
		cooperation: yup
			.array()
			.of(yup.string())
			.min(1, translate('form.validation.brandSelectionRequired'))
			.nullable(true),
		contract: yup
			.mixed()
			.test(
				'is-valid',
				translate('form.validation.required'),
				(value) => value === null || value.length
			),
		place: yup
			.mixed()
			.test(
				'is-valid',
				translate('form.validation.required'),
				(value) => value === null || value.length
			),
		remark: yup.array().of(
			yup.object().shape({
				language: yup.string().required(translate('form.validation.required')),
				value: yup.string().required(translate('form.validation.required'))
			})
		),
		tale: yup.array().of(
			yup.object().shape({
				article: yup.string(),
				language: yup.string().required(translate('form.validation.required')),
				lead: yup
					.string()
					.min(12, translate('form.validation.minChars', { value: 12 }))
					.required(translate('form.validation.required'))
			})
		),
		barcode: yup
			.mixed()
			.test(
				'is-valid',
				translate('form.validation.required'),
				(value) => value === null || value.length
			),
		// -----------
		fermentation: yup
			.array()
			.of(yup.mixed().oneOf(Object.values(Fermentation)))
			.min(1)
			.nullable(true),
		style: yup.array().of(
			yup.object().shape({
				language: yup.string().required(translate('form.validation.required')),
				value: yup
					.string()
					.min(3, translate('form.validation.minChars', { value: 3 }))
					.required()
			})
		),
		extract: yup.object().shape({
			value: yup
				.number()
				.typeError(translate('form.validation.typeErrorNumber'))
				.min(0, translate('form.validation.min', { value: 0 }))
				.max(100, translate('form.validation.max', { value: 100 }))
				.nullable(true),
			unit: yup
				.mixed()
				.test(
					'is-valid',
					translate('form.validation.required'),
					(value) => value === null || value.length
				),
			relate: yup
				.mixed()
				.test(
					'is-valid',
					translate('form.validation.required'),
					(value) => value === null || value.length
				)
		}),
		alcohol: yup.object().shape({
			value: yup
				.number()
				.typeError(translate('form.validation.typeErrorNumber'))
				.min(0, translate('form.validation.min', { value: 1 }))
				.max(100, translate('form.validation.max', { value: 100 }))
				.nullable(true),
			unit: yup
				.mixed()
				.test(
					'is-valid',
					translate('form.validation.required'),
					(value) => value === null || value.length
				),
			relate: yup
				.mixed()
				.test(
					'is-valid',
					translate('form.validation.required'),
					(value) => value === null || value.length
				),
			scope: yup
				.mixed()
				.test(
					'is-valid',
					translate('form.validation.required'),
					(value) => value === null || value.length
				)
		}),
		filtration: yup.boolean().nullable(true),
		pasteurization: yup.boolean().nullable(true),
		aged: yup.array().of(
			yup.object().shape({
				type: yup
					.mixed()
					.oneOf([...Object.values(AgedType), null])
					.nullable(true),
				wood: yup
					.mixed()
					.oneOf([...Object.values(AgedWood), null])
					.nullable(true),
				time: yup
					.object()
					.shape({
						unit: yup.mixed().oneOf([...Object.values(AgedTimeUnit), null]),
						value: yup.number().typeError(translate('form.validation.typeErrorNumber'))
					})
					.required(),
				previousContent: yup.array().of(yup.string())
			})
		),
		dryHopped: yup.array().of(yup.string()).nullable(true),
		hopRate: yup
			.object()
			.shape({
				value: yup
					.number()
					.typeError(translate('form.validation.typeErrorNumber'))
					.min(1, translate('form.validation.min', { value: 1 }))
					.max(100, translate('form.validation.max', { value: 100 }))
					.nullable(true),
				unit: yup.string().min(1, translate('form.validation.required')).nullable(true)
			})
			.required(),
		nitrogen: yup.boolean().nullable(true),
		expirationDate: yup
			.object()
			.shape({
				value: yup
					.number()
					.typeError(translate('form.validation.typeErrorNumber'))
					.min(1, translate('form.validation.min', { value: 1 }))
					.max(500, translate('form.validation.max', { value: 500 }))
					.nullable(true),
				unit: yup.string().min(1, translate('form.validation.required')).nullable(true)
			})
			.required(),
		// -----------
		ingredients: yup.array().of(
			yup.object().shape({
				complete: yup.boolean().required(),
				language: yup
					.string()
					.typeError(translate('form.validation.required'))
					.required(translate('form.validation.required')),
				list: yup
					.array()
					.min(1, translate('form.validation.min', { value: 1 }))
					.of(yup.string().min(3, translate('form.validation.minChars', { value: 3 })))
			})
		),
		ingredientTags: yup
			.array()
			.of(yup.string())
			.min(1, translate('form.validation.ingredientSelectionRequired'))
			.nullable(true),
		smokedMalt: yup.boolean().nullable(true),
		// -----------
		bitterness: yup
			.number()
			.typeError(translate('form.validation.typeErrorNumber'))
			.min(0, translate('form.validation.min', { value: 0 }))
			.max(100, translate('form.validation.max', { value: 100 }))
			.integer(translate('form.validation.integer'))
			.nullable(true),
		sweetness: yup
			.number()
			.typeError(translate('form.validation.typeErrorNumber'))
			.min(0, translate('form.validation.min', { value: 0 }))
			.max(100, translate('form.validation.max', { value: 100 }))
			.integer(translate('form.validation.integer'))
			.nullable(true),
		fullness: yup
			.number()
			.typeError(translate('form.validation.typeErrorNumber'))
			.min(0, translate('form.validation.min', { value: 0 }))
			.max(100, translate('form.validation.max', { value: 100 }))
			.integer(translate('form.validation.integer'))
			.nullable(true),
		power: yup
			.number()
			.typeError(translate('form.validation.typeErrorNumber'))
			.min(0, translate('form.validation.min', { value: 0 }))
			.max(100, translate('form.validation.max', { value: 100 }))
			.integer(translate('form.validation.integer'))
			.nullable(true),
		hoppyness: yup
			.number()
			.typeError(translate('form.validation.typeErrorNumber'))
			.min(0, translate('form.validation.min', { value: 0 }))
			.max(100, translate('form.validation.max', { value: 100 }))
			.integer(translate('form.validation.integer'))
			.nullable(true),
		temperature: yup
			.object()
			.shape({
				from: yup
					.number()
					.typeError(translate('form.validation.typeErrorNumber'))
					.min(0, translate('form.validation.min', { value: 0 }))
					.max(yup.ref('to'), (v) => translate('form.validation.max', { value: v.max }))
					.nullable(true),
				to: yup
					.number()
					.typeError(translate('form.validation.typeErrorNumber'))
					.min(yup.ref('from'), (v) => translate('form.validation.min', { value: v.min }))
					.max(100, translate('form.validation.max', { value: 100 }))
					.nullable(true),
				unit: yup.string().min(1, translate('form.validation.required')).nullable(true)
			})
			.required(),
		// -----------
		container: yup.object().shape({
			color: yup.string().required(translate('form.validation.required')),
			hasCapWireFlip: yup.boolean(),
			hasCork: yup.boolean(),
			material: yup.string().required(translate('form.validation.required')),
			type: yup.string().required(translate('form.validation.required')),
			unit: yup.string().required(translate('form.validation.required')),
			value: yup
				.number()
				.typeError(translate('form.validation.typeErrorNumber'))
				.min(1, translate('form.validation.min', { value: 1 }))
				.max(5000, translate('form.validation.max', { value: 5000 }))
				.required(translate('form.validation.required'))
		}),
		price: yup.array().of(
			yup.object().shape({
				currency: yup.string().required(translate('form.validation.required')),
				date: yup
					.mixed()
					.test('isCorrectDate', translate('form.validation.wrongDate'), (value) =>
						isValidDate(value)
					),
				shop: yup.string().nullable(true),
				value: yup
					.number()
					.typeError(translate('form.validation.typeErrorNumber'))
					.min(0.1, translate('form.validation.min', { value: 0.1 }))
					.required(translate('form.validation.required'))
			})
		)
	});
}
