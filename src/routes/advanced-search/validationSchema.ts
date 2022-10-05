import * as yup from 'yup';

type translateType = (value: string) => string; // @ToDo: could have second argument, types to revalidate

export function getValidationSchema(translate: translateType) {
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
		brands: yup
			.array()
			.of(yup.string())
			.min(1, translate('form.validation.atLeastOneBrandRequired'))
			.nullable(true),
		name: yup.mixed().when(['styleTags', 'ingredientTags', 'brands'], {
			is: (styleTags: string[] | null, ingredientTags: string[] | null, brands: string[] | null) =>
				!styleTags && !ingredientTags && !brands,
			then: yup
				.mixed()
				.test(
					'is-valid',
					translate('form.validation.atLeastOneFilterRequired'),
					(value) => value?.length
				),
			otherwise: yup
				.mixed()
				.test(
					'is-valid',
					translate('form.validation.required'),
					(value) => value === null || value.length
				)
		})
	});
}
