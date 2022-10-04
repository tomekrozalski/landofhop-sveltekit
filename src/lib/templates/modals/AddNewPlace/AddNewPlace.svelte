<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';

	import ModalGrid from '$lib/elements/form/ModalGrid.svelte';
	import ButtonWrapper from '$lib/elements/form/ButtonWrapper.svelte';
	import Button from '$lib/elements/form/Button.svelte';
	import City from '$lib/elements/form/fields/City.svelte';
	import Country from '$lib/elements/form/fields/Country.svelte';
	import Institutions from '$lib/elements/form/fields/Institutions.svelte';
	import Coordinates from '$lib/elements/form/fields/Coordinates.svelte';
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
			<h2>{$translate('dashboard.addNewPlace')}</h2>
		</header>
		<ModalGrid columns={2}>
			<City {formName} {formData} />
		</ModalGrid>
		<ModalGrid>
			<Country {formName} {formData} />
		</ModalGrid>
		<ModalGrid>
			<Institutions {formName} {formData} />
		</ModalGrid>
		<ModalGrid columns={2} isOptional>
			<Coordinates {formName} {formData} />
		</ModalGrid>
		<ButtonWrapper modal>
			<Button isIrreversible isSubmitting={$isSubmitting} type="submit">
				{$translate('dashboard.button.save')}
			</Button>
		</ButtonWrapper>
	</form>
</ModalWrapper>
