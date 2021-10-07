<script lang="ts">
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
	import Website from '$lib/dashboard/fields/website.svelte';
	import { emptyLanguageValue } from '$lib/dashboard/utils/emptyFieldValues';
	import ModalWrapper from './modalWrapper.svelte';

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
				.min(1),
			owner: yup
				.string()
				.transform((v) => (v === null ? 'test' : v))
				.required($translate('form.validation.required')),
			website: yup
				.string()
				.transform((v) => (v === null ? 'http://www.test.com' : v))
				.url('url')
				.required($translate('form.validation.required'))
		}),
		onSubmit: async (values) => {
			const data = await new Promise((resolve) => {
				setTimeout(resolve, 50000);
			});

			console.log({ values });
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
