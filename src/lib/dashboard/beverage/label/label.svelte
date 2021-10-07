<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import cloneDeep from 'lodash/cloneDeep.js';

	import Grid from '$lib/dashboard/elements/grid.svelte';
	import ButtonWrapper from '$lib/dashboard/elements/buttonWrapper.svelte';
	import Button from '$lib/elements/form/button.svelte';
	import Badge from '$lib/dashboard/fields/badge.svelte';
	import Brand from '$lib/dashboard/fields/brand.svelte';
	import Cooperation from '$lib/dashboard/fields/cooperation.svelte';
	import Name from '$lib/dashboard/fields/name.svelte';
	import Series from '$lib/dashboard/fields/series.svelte';
	import { emptyLanguageValue } from '$lib/dashboard/utils/emptyFieldValues';

	const formName = 'label';

	const formData = createForm({
		initialValues: {
			badge: '',
			name: [cloneDeep(emptyLanguageValue)],
			series: [],
			brand: '',
			cooperation: null
		},
		validationSchema: yup.object().shape({
			badge: yup
				.string()
				.min(3, $translate('form.validation.atLeastThreeSignsRequired'))
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
			),
			brand: yup.string().required($translate('form.validation.required')),
			cooperation: yup
				.array()
				.min(1, $translate('form.validation.brandSelectionRequired'))
				.nullable(true)
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
	<Grid>
		<Badge {formName} {formData} />
	</Grid>
	<h3><span>{$translate('dashboard.beverage.brandInfo')}</span></h3>
	<Grid columns={2}>
		<Name {formName} {formData} />
	</Grid>
	<Grid columns={2}>
		<Series {formName} {formData} />
	</Grid>
	<Grid>
		<Brand {formName} {formData} />
	</Grid>
	<Grid isOptional>
		<Cooperation {formName} {formData} />
	</Grid>
	<ButtonWrapper>
		<Button type="submit">
			{$translate('dashboard.button.moveOn')}
		</Button>
	</ButtonWrapper>
</form>
