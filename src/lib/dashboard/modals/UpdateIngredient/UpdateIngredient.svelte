<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import { page } from '$app/stores';

	import dictionary from '$lib/utils/dictionary/screens/dashboard.json';
	import ModalGrid from '$lib/dashboard/elements/ModalGrid.svelte';
	import ButtonWrapper from '$lib/elements/form/ButtonWrapper.svelte';
	import Button from '$lib/elements/form/Button.svelte';
	import Badge from '$lib/dashboard/fields/badge.svelte';
	import IngredientType from '$lib/dashboard/fields/ingredientType.svelte';
	import Name from '$lib/dashboard/fields/name.svelte';
	import ParentIngredient from '$lib/dashboard/fields/parentIngredient.svelte';
	import ModalWrapper from '../ModalWrapper.svelte';
	import type { Ingredient } from '$lib/utils/types/Ingredient';
	import { getValidationSchema } from './validationSchema';
	import { onSubmit } from './onSubmit';

	translations.update(dictionary);

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
			<Name {formName} {formData} />
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
