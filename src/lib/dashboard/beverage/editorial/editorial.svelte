<script lang="ts">
	import { getContext } from 'svelte';
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import { page as pageProps } from '$app/stores';

	import { editorialStore } from '$lib/dashboard/utils/stores';
	import { page } from '$lib/dashboard/utils/stores';
	import Grid from '$lib/dashboard/elements/grid.svelte';
	import ButtonWrapper from '$lib/dashboard/elements/buttonWrapper.svelte';
	import Button from '$lib/elements/form/button.svelte';
	import AlcoholScope from '$lib/dashboard/fields/alcoholScope.svelte';
	import Contract from '$lib/dashboard/fields/contract.svelte';
	import Cooperation from '$lib/dashboard/fields/cooperation.svelte';
	import Filtration from '$lib/dashboard/fields/filtration.svelte';
	import Notes from '$lib/dashboard/fields/notes.svelte';
	import Pasteurization from '$lib/dashboard/fields/pasteurization.svelte';
	import Price from '$lib/dashboard/fields/price.svelte';
	import StyleBeverage from '$lib/dashboard/fields/style.svelte';
	import { onSubmit } from './onSubmit';
	import { getValidationSchema } from './validationSchema';

	export let isActive: boolean;
	const params: any = $pageProps.params;
	const formName = 'editorial';
	const formData = createForm({
		initialValues: $editorialStore,
		validationSchema: getValidationSchema($translate),
		onSubmit: onSubmit(getContext('formType'), params)
	});
</script>

{#if isActive}
	<form on:submit={formData.handleSubmit} novalidate>
		<header>
			<h2>{$translate('dashboard.beverage.editorialInfo.title')}</h2>
			<p>{$translate('dashboard.beverage.editorialInfo.description')}</p>
		</header>
		<h3><span>{$translate('dashboard.beverage.brandInfo')}</span></h3>
		<Grid isOptional>
			<Cooperation {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Contract {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.brewingInfo')}</span></h3>
		<Grid columns={2}>
			<StyleBeverage {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<AlcoholScope {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Filtration {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Pasteurization {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.otherInfo')}</span></h3>
		<Grid columns={3}>
			<Price {formName} {formData} />
		</Grid>
		<!-- <Added form="editorial" /> -->
		<!-- <Updated form="editorial" /> -->
		<Grid isOptional>
			<Notes {formName} {formData} />
		</Grid>
		<ButtonWrapper>
			<Button handleClick={() => page.set('producer')} isSecondary>
				{$translate('dashboard.button.moveBack')}
			</Button>
			<Button isIrreversible type="submit">
				{$translate('dashboard.button.save')}
			</Button>
		</ButtonWrapper>
	</form>
{/if}
