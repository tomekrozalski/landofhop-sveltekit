<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';

	import Badge from '$lib/elements/form/fields/Badge.svelte';
	import Button from '$lib/elements/form/Button.svelte';
	import ButtonWrapper from '$lib/elements/form/ButtonWrapper.svelte';
	import IngredientType from '$lib/elements/form/fields/IngredientType.svelte';
	import ModalGrid from '$lib/elements/form/ModalGrid.svelte';
	import Name from '$lib/elements/form/fields/Name.svelte';
	import ParentIngredient from '$lib/elements/form/fields/ParentIngredient.svelte';

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
