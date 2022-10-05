import * as yup from 'yup';

// @ToDo types
export function getValidationSchema(translate) {
	return yup.object().shape({
		badge: yup
			.string()
			.min(3, translate('form.validation.atLeastThreeSignsRequired'))
			.matches(/^[a-z\d-]+$/, translate('form.validation.badge'))
			.required(translate('form.validation.required')),
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
		owner: yup
			.string()
			.transform((v) => (v === null ? 'test' : v))
			.required(translate('form.validation.required')),
		website: yup
			.string()
			.transform((v) => (v === null ? 'http://www.test.com' : v))
			.url(translate('form.validation.invalidUrl'))
			.required(translate('form.validation.required'))
	});
}
