import * as yup from 'yup';

export function getValidationSchema(translate) {
	return yup.object().shape({
		// badge: yup
		// 	.string()
		// 	.min(3, translate('form.validation.atLeastThreeSignsRequired'))
		// 	.matches(/^[a-z\d-]+$/, translate('form.validation.badge'))
		// 	.required(translate('form.validation.required')),
		// name: yup
		// 	.array()
		// 	.of(
		// 		yup.object().shape({
		// 			language: yup.string().required(translate('form.validation.required')),
		// 			value: yup.string().required(translate('form.validation.required'))
		// 		})
		// 	)
		// 	.required()
		// 	.min(1),
		// series: yup.array().of(
		// 	yup.object().shape({
		// 		language: yup.string().required(translate('form.validation.required')),
		// 		value: yup.string().required(translate('form.validation.required'))
		// 	})
		// ),
		// brand: yup.string().required(translate('form.validation.required')),
		// cooperation: yup
		// 	.array()
		// 	.min(1, translate('form.validation.brandSelectionRequired'))
		// 	.nullable(true),
		// container: yup.object().shape({
		// 	color: yup.string().required(translate('form.validation.required')),
		// 	hasCapWireFlip: yup.boolean(),
		// 	hasCork: yup.boolean(),
		// 	material: yup.string().required(translate('form.validation.required')),
		// 	type: yup.string().required(translate('form.validation.required')),
		// 	unit: yup.string().required(translate('form.validation.required')),
		// 	value: yup
		// 		.number()
		// 		.typeError(translate('form.validation.typeErrorNumber'))
		// 		.min(1, translate('form.validation.min', { value: 1 }))
		// 		.max(5000, translate('form.validation.max', { value: 5000 }))
		// 		.required(translate('form.validation.required'))
		// })
	});
}
