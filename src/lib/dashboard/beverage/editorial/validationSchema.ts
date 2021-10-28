import * as yup from 'yup';

import { Fermentation } from '$lib/utils/enums/Beverage.enum';
import { isValidDate } from '$lib/dashboard/utils/isValidDate';

export function getValidationSchema(translate) {
	return yup.object().shape({
		cooperation: yup
			.array()
			.min(1, translate('form.validation.brandSelectionRequired'))
			.nullable(true),
		contract: yup
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
				value: yup.string().min(3).required()
			})
		),
		alcoholScope: yup
			.mixed()
			.test(
				'is-valid',
				translate('form.validation.required'),
				(value) => value === null || value.length
			),
		filtration: yup.boolean().nullable(true),
		pasteurization: yup.boolean().nullable(true),
		// -----------
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
		),
		notes: yup
			.string()
			.min(3, translate('form.validation.atLeastThreeSignsRequired'))
			.nullable(true)
	});
}
