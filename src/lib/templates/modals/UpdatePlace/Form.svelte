<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import Button from '$lib/atoms/forms/Button/Button.svelte';
	import ButtonWrapper from '$lib/atoms/forms/ButtonWrapper.svelte';
	import City from '$lib/molecules/forms/fields/City.svelte';
	import Country from '$lib/molecules/forms/fields/Country.svelte';
	import Institutions from '$lib/molecules/forms/fields/Institutions.svelte';
	import Coordinates from '$lib/molecules/forms/fields/Coordinates.svelte';
	import ModalGrid from '../ModalGrid.svelte';
	import { getValidationSchema } from './validationSchema';
	import type { Input } from './types.d';
	import { onSubmit } from './onSubmit';

	export let close: () => void;
	export let initialValues: Input;
	const formName = 'place';

	console.log('initialValues', initialValues);

	const formData = createForm({
		initialValues,
		validationSchema: getValidationSchema($translate),
		onSubmit: onSubmit(close)
	});

	const { isSubmitting } = formData;
</script>

<form on:submit={formData.handleSubmit} novalidate>
	<ModalGrid columns={2}>
		<City {formName} {formData} />
	</ModalGrid>
	<ModalGrid>
		<Country {formName} {formData} />
	</ModalGrid>
	<ModalGrid>
		<Institutions {formName} {formData} />
	</ModalGrid>
	<ModalGrid columns={2}>
		<Coordinates {formName} {formData} />
	</ModalGrid>
	<ButtonWrapper modal>
		<Button isIrreversible isSubmitting={$isSubmitting} type="submit">
			{$translate('dashboard.button.save')}
		</Button>
	</ButtonWrapper>
</form>
