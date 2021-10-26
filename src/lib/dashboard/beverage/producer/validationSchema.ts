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
		// -----------
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
		pasteurization: yup.boolean().nullable(true)
	});
}
