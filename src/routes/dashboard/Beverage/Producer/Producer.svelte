<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';

	import Button from '$lib/atoms/forms/Button/Button.svelte';
	import ButtonWrapper from '$lib/atoms/forms/ButtonWrapper.svelte';
	import Grid from '$lib/atoms/forms/Grid.svelte';
	import Aged from '$lib/molecules/forms/fields/Aged/Aged.svelte';
	import Alcohol from '$lib/molecules/forms/fields/Alcohol.svelte';
	import Bitterness from '$lib/molecules/forms/fields/Bitterness.svelte';
	import Contract from '$lib/molecules/forms/fields/Contract.svelte';
	import Cooperation from '$lib/molecules/forms/fields/Cooperation.svelte';
	import DryHopped from '$lib/molecules/forms/fields/DryHopped.svelte';
	import ExpirationDate from '$lib/molecules/forms/fields/ExpirationDate.svelte';
	import Extract from '$lib/molecules/forms/fields/Extract.svelte';
	import Fermentation from '$lib/molecules/forms/fields/Fermentation.svelte';
	import Filtration from '$lib/molecules/forms/fields/Filtration.svelte';
	import Fullness from '$lib/molecules/forms/fields/Fullness.svelte';
	import Hoppyness from '$lib/molecules/forms/fields/Hoppyness.svelte';
	import HopRate from '$lib/molecules/forms/fields/HopRate.svelte';
	import Ingredients from '$lib/molecules/forms/fields/Ingredients/Ingredients.svelte';
	import IngredientTags from '$lib/molecules/forms/fields/IngredientTags.svelte';
	import Nitrogen from '$lib/molecules/forms/fields/Nitrogen.svelte';
	import Pasteurization from '$lib/molecules/forms/fields/Pasteurization.svelte';
	import Place from '$lib/molecules/forms/fields/Place.svelte';
	import Power from '$lib/molecules/forms/fields/Power.svelte';
	import Price from '$lib/molecules/forms/fields/Price.svelte';
	import Remark from '$lib/molecules/forms/fields/Remark.svelte';
	import Series from '$lib/molecules/forms/fields/Series.svelte';
	import SmokedMalt from '$lib/molecules/forms/fields/SmokedMalt.svelte';
	import StyleBeverage from '$lib/molecules/forms/fields/Style.svelte';
	import Sweetness from '$lib/molecules/forms/fields/Sweetness.svelte';
	import Tale from '$lib/molecules/forms/fields/Tale.svelte';
	import Temperature from '$lib/molecules/forms/fields/Temperature.svelte';
	import { page, producerStore } from '../stores';
	import { onSubmit } from './onSubmit';
	import { getValidationSchema } from './validationSchema';

	export let isActive: boolean;
	const formName = 'producer';
	const formData = createForm({
		initialValues: $producerStore,
		validationSchema: getValidationSchema($translate),
		onSubmit
	});
</script>

{#if isActive}
	<form on:submit={formData.handleSubmit} novalidate>
		<header>
			<h2>{$translate('dashboard.beverage.producerInfo.title')}</h2>
			<p>{$translate('dashboard.beverage.producerInfo.description')}</p>
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
		<Grid>
			<Tale {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.brewingInfo')}</span></h3>
		<Grid isOptional>
			<Fermentation {formName} {formData} />
		</Grid>
		<Grid columns={2}>
			<StyleBeverage {formName} {formData} />
		</Grid>
		<Grid columns={3} isOptional>
			<Extract {formName} {formData} />
		</Grid>
		<Grid columns={3} isOptional>
			<Alcohol {formName} {formData} />
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
		<Grid columns={2} isOptional>
			<HopRate {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Nitrogen {formName} {formData} />
		</Grid>
		<Grid columns={2} isOptional>
			<ExpirationDate {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.ingredientsInfo')}</span></h3>
		<Grid>
			<Ingredients {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<IngredientTags {formName} {formData} admin />
		</Grid>
		<Grid isOptional>
			<SmokedMalt {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.impressionsInfo')}</span></h3>
		<Grid isOptional>
			<Bitterness {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Sweetness {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Fullness {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Power {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Hoppyness {formName} {formData} />
		</Grid>
		<Grid columns={3} isOptional>
			<Temperature {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.otherInfo')}</span></h3>
		<Grid columns={3}>
			<Price {formName} {formData} />
		</Grid>
		<ButtonWrapper>
			<Button handleClick={() => page.set('label')} isSecondary>
				{$translate('dashboard.button.moveBack')}
			</Button>
			<Button type="submit">
				{$translate('dashboard.button.moveOn')}
			</Button>
		</ButtonWrapper>
	</form>
{/if}
