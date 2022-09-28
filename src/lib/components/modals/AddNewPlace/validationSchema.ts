import * as yup from 'yup';

export function getValidationSchema(translate) {
	return yup.object().shape({
		city: yup
			.array()
			.of(
				yup.object().shape({
					language: yup.string().required(translate('form.validation.required')),
					value: yup.string().required(translate('form.validation.required'))
				})
			)
			.required()
			.min(1),
		country: yup
			.mixed()
			.test(
				'is-valid',
				translate('form.validation.required'),
				(value) => value === null || value.length
			),
		institution: yup
			.mixed()
			.test(
				'is-valid',
				translate('form.validation.required'),
				(value) => value === null || value.length
			),
		coordinates: yup.object().shape({
			longitude: yup
				.number()
				.typeError(translate('form.validation.typeErrorNumber'))
				.min(0, translate('form.validation.min', { value: 0 }))
				.max(180, translate('form.validation.max', { value: 180 }))
				.nullable(true),
			latitude: yup
				.number()
				.typeError(translate('form.validation.typeErrorNumber'))
				.min(0, translate('form.validation.min', { value: 0 }))
				.max(90, translate('form.validation.max', { value: 90 }))
				.nullable(true)
		})
	});
}
