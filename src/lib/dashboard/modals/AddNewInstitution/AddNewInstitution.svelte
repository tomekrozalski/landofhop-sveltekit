<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';

	import ModalGrid from '$lib/dashboard/elements/ModalGrid.svelte';
	import ButtonWrapper from '$lib/elements/form/ButtonWrapper.svelte';
	import Button from '$lib/elements/form/Button.svelte';
	import Badge from '$lib/dashboard/fields/Badge.svelte';
	import Name from '$lib/dashboard/fields/Name.svelte';
	import Owner from '$lib/dashboard/fields/Owner.svelte';
	import Website from '$lib/dashboard/fields/Website.svelte';
	import ModalWrapper from '../ModalWrapper.svelte';
	import { getValidationSchema } from './validationSchema';
	import { initialValues } from './initialValues';
	import { onSubmit } from './onSubmit';

	export let close: () => void;
	const formName = 'institution';

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
			<h2>{$translate('dashboard.addNewInstitution')}</h2>
		</header>
		<ModalGrid>
			<Badge {formName} {formData} />
		</ModalGrid>
		<ModalGrid columns={2}>
			<Name {formName} {formData} />
		</ModalGrid>
		<ModalGrid isOptional>
			<Owner {formName} {formData} />
		</ModalGrid>
		<ModalGrid isOptional>
			<Website {formName} {formData} />
		</ModalGrid>
		<ButtonWrapper modal>
			<Button isIrreversible isSubmitting={$isSubmitting} type="submit">
				{$translate('dashboard.button.save')}
			</Button>
		</ButtonWrapper>
	</form>
</ModalWrapper>
