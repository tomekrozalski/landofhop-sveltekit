<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';

	import ModalGrid from '$lib/dashboard/elements/modalGrid.svelte';
	import ButtonWrapper from '$lib/dashboard/elements/buttonWrapper.svelte';
	import Button from '$lib/elements/form/button.svelte';
	import City from '$lib/dashboard/fields/city.svelte';
	import Country from '$lib/dashboard/fields/country.svelte';
	import Institutions from '$lib/dashboard/fields/institutions.svelte';
	import Coordinates from '$lib/dashboard/fields/coordinates.svelte';
	import ModalWrapper from '../modalWrapper.svelte';
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
