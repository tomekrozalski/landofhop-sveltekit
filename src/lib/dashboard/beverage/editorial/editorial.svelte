<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';

	import { page } from '$lib/dashboard/utils/stores';
	import Grid from '$lib/dashboard/elements/grid.svelte';
	import ButtonWrapper from '$lib/dashboard/elements/buttonWrapper.svelte';
	import Button from '$lib/elements/form/button.svelte';
	import Cooperation from '$lib/dashboard/fields/cooperation.svelte';
	import { initialValues } from './initialValues';
	import { onSubmit } from './onSubmit';
	import { getValidationSchema } from './validationSchema';

	export let isActive: boolean;
	const formName = 'editorial';
	const formData = createForm({
		initialValues,
		validationSchema: getValidationSchema($translate),
		onSubmit
	});
</script>

{#if isActive}
	<form on:submit={formData.handleSubmit} novalidate>
		<header>
			<h2>{$translate('dashboard.beverage.editorialInfo.title')}</h2>
			<p>{$translate('dashboard.beverage.editorialInfo.description')}</p>
		</header>
		<Grid isOptional>
			<Cooperation {formName} {formData} />
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
