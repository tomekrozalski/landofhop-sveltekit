<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	import { session } from '$app/stores';
	import navigation from '$lib/utils/stores/navigation';
	import Status from '$lib/utils/enums/Status.enum';
	import Button from '$lib/elements/form/button.svelte';
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import Email from './Email.svelte';
	import Password from './Password.svelte';

	const formName = 'login';

	const formData = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup
				.string()
				.email($translate('form.validation.email'))
				.required($translate('form.validation.required')),
			password: yup.string().required($translate('form.validation.required'))
		}),
		onSubmit: (values) => {
			navigation.setLoginStatus(Status.pending);

			apiCall(fetch, Endpoints.logIn, {
				method: 'POST',
				body: JSON.stringify(values)
			})
				.then(() => {
					$session.isLoggedIn = true;
					navigation.setLoginStatus(Status.fulfilled);
				})
				.catch(() => navigation.setLoginStatus(Status.rejected));
		}
	});

	const { isSubmitting } = formData;
</script>

<form on:submit={formData.handleSubmit} autocomplete="off" novalidate>
	<Email {formName} {formData} />
	<Password {formName} {formData} />
	<div class="button-wrapper">
		<Button isSubmitting={$isSubmitting} type="submit">
			{$translate('login.submit')}
		</Button>
	</div>
</form>

<style>
	form {
		flex-direction: column;
	}

	form :global(.input-group) {
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 1fr 2fr;
		margin: 1rem 0;
	}

	.button-wrapper {
		align-self: flex-end;
	}

	@media (--md) {
		form {
			padding: 3rem 4rem;
		}
	}

	@media (--lg) {
		form :global(.input-group) {
			grid-template-columns: auto 30rem;
			margin: 1rem;
		}

		form {
			flex-direction: row;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			padding: 0 2rem;
		}

		.button-wrapper {
			align-self: auto;
		}
	}
</style>
