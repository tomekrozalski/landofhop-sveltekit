import * as yup from 'yup';

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
		notes: yup
			.string()
			.min(3, translate('form.validation.atLeastThreeSignsRequired'))
			.nullable(true)
	});
}
