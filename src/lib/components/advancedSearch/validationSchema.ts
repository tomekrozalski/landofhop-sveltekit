import * as yup from 'yup';

export function getValidationSchema(translate) {
	return yup.object().shape({
		styleTags: yup
			.array()
			.of(yup.string())
			.min(1, translate('form.validation.tagSelectionRequired'))
			.nullable(true),
		ingredientTags: yup
			.array()
			.of(yup.string())
			.min(1, translate('form.validation.tagSelectionRequired'))
			.nullable(true),
		brands: yup.array().of(yup.string()).min(1, translate('form.validation.BRAND')).nullable(true),
		name: yup
			.mixed()
			.test(
				'is-valid',
				translate('form.validation.required'),
				(value) => value === null || value.length
			)
	});
}
