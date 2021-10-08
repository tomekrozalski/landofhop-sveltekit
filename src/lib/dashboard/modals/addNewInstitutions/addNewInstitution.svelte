<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import cloneDeep from 'lodash/cloneDeep.js';

	import { institutionStore } from '$lib/dashboard/utils/stores';
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import ModalGrid from '$lib/dashboard/elements/modalGrid.svelte';
	import ButtonWrapper from '$lib/dashboard/elements/buttonWrapper.svelte';
	import Button from '$lib/elements/form/button.svelte';
	import Badge from '$lib/dashboard/fields/badge.svelte';
	import Name from '$lib/dashboard/fields/name.svelte';
	import Owner from '$lib/dashboard/fields/owner.svelte';
	import Website from '$lib/dashboard/fields/website.svelte';
	import { emptyLanguageValue } from '$lib/dashboard/utils/emptyFieldValues';
	import ModalWrapper from '../modalWrapper.svelte';
	import formatValues from './formatValues';

	export let close: () => void;
	const formName = 'institution';

	const formData = createForm({
		initialValues: {
			badge: '',
			name: [cloneDeep(emptyLanguageValue)],
			owner: null,
			website: null
		},
		validationSchema: yup.object().shape({
			badge: yup
				.string()
				.min(3, $translate('form.validation.atLeastThreeSignsRequired'))
				.matches(/^[a-z\d-]+$/, $translate('form.validation.badge'))
				.required($translate('form.validation.required')),
			name: yup
				.array()
				.of(
					yup.object().shape({
						language: yup.string().required($translate('form.validation.required')),
						value: yup.string().required($translate('form.validation.required'))
					})
				)
				.required()
				.min(1),
			owner: yup
				.string()
				.transform((v) => (v === null ? 'test' : v))
				.required($translate('form.validation.required')),
			website: yup
				.string()
				.transform((v) => (v === null ? 'http://www.test.com' : v))
				.url($translate('form.validation.invalidUrl'))
				.required($translate('form.validation.required'))
		}),
		onSubmit: async (values) => {
			const formattedValues = formatValues(values, $institutionStore);

			const updatedInstitutions = await serverCall(fetch, Endpoints.addInstitution, {
				method: 'POST',
				body: JSON.stringify(formattedValues)
			});

			institutionStore.set(updatedInstitutions);
			close();
		}
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
			<Button isSubmitting={$isSubmitting} type="submit">
				{$translate('dashboard.button.save')}
			</Button>
		</ButtonWrapper>
	</form>
</ModalWrapper>
