<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	import Button from '$lib/elements/form/button.svelte';
	import Badge from '$lib/dashboard/fields/badge.svelte';
	import Name from '$lib/dashboard/fields/name.svelte';

	const formName = 'label';

	const formData = createForm({
		initialValues: {
			badge: '',
			name: [{ language: null, value: '' }]
		},
		validationSchema: yup.object().shape({
			badge: yup
				.string()
				.min(3, 'minimum trzy znaki')
				.matches(/^[a-z\d-]+$/, 'tylko małe litery i ?')
				.required('required'),
			name: yup
				.array()
				.of(
					yup.object().shape({
						language: yup.object().shape({
							label: yup.string().required('required'),
							value: yup.string().required('required')
						}),
						value: yup.string().min(1).required()
					})
				)
				.required()
				.min(1)
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
	<Button type="submit">
		{$translate('login.submit')}
	</Button>
</form>
