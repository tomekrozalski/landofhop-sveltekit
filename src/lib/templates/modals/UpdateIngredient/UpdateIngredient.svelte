<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import { page } from '$app/stores';
	// import dictionary from 'src/routes/dashboard/Beverage/dictionary.json';
	import Button from '$lib/atoms/forms/Button/Button.svelte';
	import ButtonWrapper from '$lib/atoms/forms/ButtonWrapper.svelte';
	import Badge from '$lib/molecules/forms/fields/Badge.svelte';
	import IngredientType from '$lib/molecules/forms/fields/IngredientType.svelte';
	import NameGroup from '$lib/molecules/forms/fields/NameGroup.svelte';
	import ParentIngredient from '$lib/molecules/forms/fields/ParentIngredient.svelte';
	import ModalGrid from '../ModalGrid.svelte';
	import ModalWrapper from '../ModalWrapper.svelte';
	import type { Ingredient } from '$lib/utils/types/Ingredient';
	import { getValidationSchema } from './validationSchema';
	import { onSubmit } from './onSubmit';

	// translations.update(dictionary);

	export let initialValues: Ingredient;
	export let close: () => void;
	const formName = 'ingredient';

	const formData = createForm({
		initialValues,
		validationSchema: getValidationSchema($translate, initialValues.badge),
		onSubmit: onSubmit(initialValues.badge, close, $page.params.type)
	});

	const { isSubmitting } = formData;
</script>

<ModalWrapper {close}>
	<form on:submit={formData.handleSubmit} novalidate>
		<header>
			<h2>{$translate('dashboard.updateIngredient')}</h2>
		</header>
		<ModalGrid>
			<Badge {formName} {formData} />
		</ModalGrid>
		<ModalGrid columns={2}>
			<NameGroup {formName} {formData} />
		</ModalGrid>
		<ModalGrid>
			<IngredientType {formName} {formData} />
		</ModalGrid>
		<ModalGrid>
			<ParentIngredient {formName} {formData} />
		</ModalGrid>
		<ButtonWrapper modal>
			<Button isIrreversible isSubmitting={$isSubmitting} type="submit">
				{$translate('dashboard.button.save')}
			</Button>
		</ButtonWrapper>
	</form>
</ModalWrapper>
