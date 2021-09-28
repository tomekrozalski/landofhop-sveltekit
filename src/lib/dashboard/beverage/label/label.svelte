<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import cloneDeep from 'lodash/cloneDeep';

	import Button from '$lib/elements/form/button.svelte';
	import Badge from '$lib/dashboard/fields/badge.svelte';
	import Name from '$lib/dashboard/fields/name.svelte';
	import Series from '$lib/dashboard/fields/series.svelte';
	import { emptyLanguageValue } from '$lib/dashboard/utils/emptyFieldValues';

	const formName = 'label';

	const formData = createForm({
		initialValues: {
			badge: '',
			name: [cloneDeep(emptyLanguageValue)],
			series: []
		},
		validationSchema: yup.object().shape({
			badge: yup
				.string()
				.min(3, 'minimum trzy znaki')
				.matches(/^[a-z\d-]+$/, $translate('form.validation.badge'))
				.required($translate('form.validation.required')),
			name: yup
				.array()
				.of(
					yup.object().shape({
						language: yup.string().required($translate('form.validation.required')),
						value: yup.string().required($translate('form.validation.required'))
					})
				)
				.required()
				.min(1),
			series: yup.array().of(
				yup.object().shape({
					language: yup.string().required($translate('form.validation.required')),
					value: yup.string().required($translate('form.validation.required'))
				})
			)
		}),
		onSubmit: (values) => {
			console.log({ values });
		}
	});
</script>

<form on:submit={formData.handleSubmit} novalidate>
	<header>
		<h2>{$translate('dashboard.beverage.labelInfo.title')}</h2>
		<p>{$translate('dashboard.beverage.labelInfo.description')}</p>
	</header>
	<Badge {formName} {formData} />
	<h3><span>{$translate('dashboard.beverage.brandInfo')}</span></h3>
	<Name {formName} {formData} />
	<Series {formName} {formData} />
	<Button type="submit">
		{$translate('login.submit')}
	</Button>
</form>
