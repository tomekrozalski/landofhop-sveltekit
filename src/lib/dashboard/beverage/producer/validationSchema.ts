import * as yup from 'yup';

export function getValidationSchema(translate) {
	return yup.object().shape({
		series: yup.array().of(
			yup.object().shape({
				language: yup.string().required(translate('form.validation.required')),
				value: yup.string().required(translate('form.validation.required'))
			})
		),
		cooperation: yup
			.array()
			.min(1, translate('form.validation.brandSelectionRequired'))
			.nullable(true),
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
		// -----------
		filtration: yup.boolean().nullable(true),
		pasteurization: yup.boolean().nullable(true)
	});
}
