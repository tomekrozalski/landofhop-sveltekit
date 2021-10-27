import * as yup from 'yup';

import { isValidDate } from '$lib/dashboard/utils/isValidDate';

export function getValidationSchema(translate) {
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
		// fermentation: Yup.array()
		// 	.of(Yup.mixed().oneOf(Object.values(FermentationEnum)))
		// 	.min(1)
		// 	.nullable(true),
		style: yup.array().of(
			yup.object().shape({
				language: yup.string().required(translate('form.validation.required')),
				value: yup.string().min(3).required()
			})
		),
		extract: yup.object().shape({
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
