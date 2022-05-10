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
		brand: yup.array().of(yup.string()).min(1, translate('form.validation.BRAND')).nullable(true)
	});
}
