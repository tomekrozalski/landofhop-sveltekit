<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import { page } from '$app/stores';
	import formDictionary from '$lib/utils/dictionary/form.json';
	import Button from '$lib/atoms/forms/Button/Button.svelte';
	import ButtonWrapper from '$lib/atoms/forms/ButtonWrapper.svelte';
	import Badge from '$lib/molecules/forms/fields/Badge.svelte';
	import IngredientType from '$lib/molecules/forms/fields/IngredientType.svelte';
	import NameGroup from '$lib/molecules/forms/fields/NameGroup.svelte';
	import ParentIngredient from '$lib/molecules/forms/fields/ParentIngredient.svelte';
	import ModalGrid from '../ModalGrid.svelte';
	import ModalWrapper from '../ModalWrapper.svelte';
	import dictionary from '../dictionary.json';
	import type { Ingredient } from '$lib/utils/types/Ingredient';
	import { getValidationSchema } from './validationSchema';
	import { onSubmit } from './onSubmit';

	translations.update(formDictionary);
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
			<h2>{$translate('modals.names.updateIngredient')}</h2>
		</header>
		<ModalGrid>
			<Badge {formName} {formData} labelId="modals.labels.badge" />
		</ModalGrid>
		<ModalGrid columns={2}>
			<NameGroup {formName} {formData} labelId="modals.labels.name" />
		</ModalGrid>
		<ModalGrid>
			<IngredientType {formName} {formData} labelId="modals.labels.ingredient.type" />
		</ModalGrid>
		<ModalGrid>
			<ParentIngredient {formName} {formData} labelId="modals.labels.ingredient.parent" />
		</ModalGrid>
		<ButtonWrapper modal>
			<Button isIrreversible isSubmitting={$isSubmitting} type="submit">
				{$translate('modals.buttons.save')}
			</Button>
		</ButtonWrapper>
	</form>
</ModalWrapper>
