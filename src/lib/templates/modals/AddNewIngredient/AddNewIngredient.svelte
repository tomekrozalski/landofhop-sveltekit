<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import Button from '$lib/atoms/forms/Button/Button.svelte';
	import ButtonWrapper from '$lib/atoms/forms/ButtonWrapper.svelte';
	import Badge from '$lib/molecules/forms/fields/Badge.svelte';
	import IngredientType from '$lib/molecules/forms/fields/IngredientType.svelte';
	import NameGroup from '$lib/molecules/forms/fields/NameGroup.svelte';
	import ParentIngredient from '$lib/molecules/forms/fields/ParentIngredient.svelte';
	import ModalGrid from '../ModalGrid.svelte';
	import ModalWrapper from '../ModalWrapper.svelte';
	import { getValidationSchema } from './validationSchema';
	import { initialValues } from './initialValues';
	import { onSubmit } from './onSubmit';

	export let close: () => void;

	const formName = 'ingredient';
	const formData = createForm({
		initialValues,
		validationSchema: getValidationSchema($translate),
		onSubmit: onSubmit(close)
	});
	const { isSubmitting } = formData;
</script>

<ModalWrapper {close}>
	<form on:submit={formData.handleSubmit} novalidate>
		<header>
			<h2>{$translate('dashboard.addNewIngredient')}</h2>
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
