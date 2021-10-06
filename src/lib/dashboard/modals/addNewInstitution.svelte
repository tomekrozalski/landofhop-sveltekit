<script>
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import cloneDeep from 'lodash/cloneDeep.js';

	import ModalGrid from '$lib/dashboard/elements/modalGrid.svelte';
	import ButtonWrapper from '$lib/dashboard/elements/buttonWrapper.svelte';
	import Button from '$lib/elements/form/button.svelte';
	import Badge from '$lib/dashboard/fields/badge.svelte';
	import Name from '$lib/dashboard/fields/name.svelte';
	import Owner from '$lib/dashboard/fields/owner.svelte';
	import { emptyLanguageValue } from '$lib/dashboard/utils/emptyFieldValues';
	import ModalWrapper from './modalWrapper.svelte';

	let isModalOpen = false;

	const formName = 'institution';

	const formData = createForm({
		initialValues: {
			badge: '',
			name: [cloneDeep(emptyLanguageValue)]
		},
		validationSchema: yup.object().shape({
			badge: yup
				.string()
				.min(3, 'minimum trzy znaki')
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
				.min(1)
		}),
		onSubmit: (values) => {
			console.log({ values });
		}
	});
</script>

<button type="button" on:click={() => (isModalOpen = true)}>dodaj</button>

{#if isModalOpen}
	<ModalWrapper close={() => (isModalOpen = false)}>
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
			<ModalGrid>
				<Owner {formName} {formData} />
			</ModalGrid>

			<ButtonWrapper modal>
				<Button type="submit">
					{$translate('dashboard.button.save')}
				</Button>
			</ButtonWrapper>
		</form>
	</ModalWrapper>
{/if}

<style>
	button {
		grid-column: span 2;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: var(--size-input-height);
		background-color: var(--color-grey-4);
		font-size: 1.5rem;
		color: var(--color-grey-2);
		transition: color var(--transition-default), background-color var(--transition-default);
	}

	button:hover {
		background-color: var(--color-black);
		color: var(--color-grey-3);
	}
</style>
