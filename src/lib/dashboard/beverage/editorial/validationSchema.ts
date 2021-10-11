import * as yup from 'yup';

export function getValidationSchema(translate) {
	return yup.object().shape({
		cooperation: yup
			.array()
			.min(1, translate('form.validation.brandSelectionRequired'))
			.nullable(true),
		notes: yup
			.string()
			.min(3, translate('form.validation.atLeastThreeSignsRequired'))
			.nullable(true)
	});
}
