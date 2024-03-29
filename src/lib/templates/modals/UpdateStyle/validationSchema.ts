import { get } from 'svelte/store';
import * as yup from 'yup';
import { styleStore } from '$lib/utils/stores/selects';
import type { Translate } from '$types/Translate';

export function getValidationSchema(translate: Translate, badge: string) {
	return yup.object().shape({
		badge: yup
			.string()
			.min(3, translate('form.validation.minChars', { value: 3 }))
			.matches(/^[a-z\d-]+$/, translate('form.validation.badge'))
			.test(
				'is-available',
				translate('form.validation.badgeAlreadyExists'),
				(value) => !get(styleStore).find((props) => props.badge === value && props.badge !== badge)
			)
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
		group: yup.string().required(translate('form.validation.required'))
	});
}
