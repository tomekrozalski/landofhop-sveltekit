<script lang="ts">
	import { getContext } from 'svelte';
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import { page as pageProps } from '$app/stores';

	// Common elements
	import Button from '$lib/atoms/forms/Button/Button.svelte';
	import ButtonWrapper from '$lib/atoms/forms/ButtonWrapper.svelte';
	import Grid from '$lib/atoms/forms/Grid.svelte';
	import StyleTags from '$lib/molecules/forms/fields/StyleTags.svelte';

	// Dashboard elements
	import { editorialStore, page } from '../stores';
	import Aged from '$lib/molecules/forms/fields/Aged/Aged.svelte';
	import AlcoholScope from '$lib/molecules/forms/fields/AlcoholScope.svelte';
	import Clarity from '$lib/molecules/forms/fields/Clarity.svelte';
	import Color from '$lib/molecules/forms/fields/Color.svelte';
	import Contract from '$lib/molecules/forms/fields/Contract.svelte';
	import Cooperation from '$lib/molecules/forms/fields/Cooperation.svelte';
	import DryHopped from '$lib/molecules/forms/fields/DryHopped.svelte';
	import Fermentation from '$lib/molecules/forms/fields/Fermentation.svelte';
	import Filtration from '$lib/molecules/forms/fields/Filtration.svelte';
	import Nitrogen from '$lib/molecules/forms/fields/Nitrogen.svelte';
	import Notes from '$lib/molecules/forms/fields/Notes.svelte';
	import Pasteurization from '$lib/molecules/forms/fields/Pasteurization.svelte';
	import Place from '$lib/molecules/forms/fields/Place.svelte';
	import Price from '$lib/molecules/forms/fields/Price.svelte';
	import RateBeer from '$lib/molecules/forms/fields/RateBeer.svelte';
	import Remark from '$lib/molecules/forms/fields/Remark.svelte';
	import Untappd from '$lib/molecules/forms/fields/Untappd.svelte';
	import Series from '$lib/molecules/forms/fields/Series.svelte';

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
	const { isSubmitting } = formData;
</script>

{#if isActive}
	<form on:submit={formData.handleSubmit} novalidate>
		<header>
			<h2>{$translate('dashboard.beverage.editorialInfo.title')}</h2>
			<p>{$translate('dashboard.beverage.editorialInfo.description')}</p>
		</header>
		<h3><span>{$translate('dashboard.beverage.brandInfo')}</span></h3>
		<Grid columns={2}>
			<Series {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Cooperation {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Contract {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Place {formName} {formData} />
		</Grid>
		<Grid columns={2}>
			<Remark {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.brewingInfo')}</span></h3>
		<Grid isOptional>
			<Fermentation {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<StyleTags {formName} {formData} labelId="dashboard.label.styleTags" admin />
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
		<Grid>
			<Aged {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<DryHopped {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Nitrogen {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.impressionsInfo')}</span></h3>
		<Grid isOptional>
			<Color {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Clarity {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.rating')}</span></h3>
		<Grid isOptional>
			<RateBeer {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Untappd {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.otherInfo')}</span></h3>
		<Grid columns={3}>
			<Price {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Notes {formName} {formData} />
		</Grid>
		<ButtonWrapper>
			<Button handleClick={() => page.set('producer')} isSecondary>
				{$translate('dashboard.button.moveBack')}
			</Button>
			<Button isIrreversible isSubmitting={$isSubmitting} type="submit">
				{$translate('dashboard.button.save')}
			</Button>
		</ButtonWrapper>
	</form>
{/if}
