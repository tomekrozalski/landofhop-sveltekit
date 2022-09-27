<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';

	// import dictionary from 'src/routes/dashboard/Beverage/dictionary.json';
	import type { Style } from '$lib/utils/types/Style';
	import ModalGrid from '$lib/dashboard/elements/ModalGrid.svelte';
	import ButtonWrapper from '$lib/elements/form/ButtonWrapper.svelte';
	import Button from '$lib/elements/form/Button.svelte';
	import Badge from '$lib/dashboard/fields/Badge.svelte';
	import Name from '$lib/dashboard/fields/Name.svelte';
	import StyleGroup from '$lib/dashboard/fields/StyleGroup.svelte';
	import ModalWrapper from '../ModalWrapper.svelte';
	import { getValidationSchema } from './validationSchema';
	import { onSubmit } from './onSubmit';

	// translations.update(dictionary);

	export let initialValues: Style;
	export let close: () => void;
	const formName = 'style';

	const formData = createForm({
		initialValues,
		validationSchema: getValidationSchema($translate, initialValues.badge),
		onSubmit: onSubmit(close, initialValues.badge)
	});

	const { isSubmitting } = formData;
</script>

<ModalWrapper {close}>
	<form on:submit={formData.handleSubmit} novalidate>
		<header>
			<h2>{$translate('dashboard.updateStyle')}</h2>
		</header>
		<ModalGrid>
			<Badge {formName} {formData} />
		</ModalGrid>
		<ModalGrid columns={2}>
			<Name {formName} {formData} />
		</ModalGrid>
		<ModalGrid>
			<StyleGroup {formName} {formData} />
		</ModalGrid>
		<ButtonWrapper modal>
			<Button isIrreversible isSubmitting={$isSubmitting} type="submit">
				{$translate('dashboard.button.save')}
			</Button>
		</ButtonWrapper>
	</form>
</ModalWrapper>
