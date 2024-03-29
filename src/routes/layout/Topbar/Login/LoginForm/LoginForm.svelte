<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { Status } from '$types/enums/Globals.enum';
	import authentication from '$lib/utils/stores/authentication';
	import Button from '$lib/atoms/forms/Button/Button.svelte';
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
			authentication.setLoginStatus(Status.pending);

			fetch('/api/user/login', {
				method: 'POST',
				body: JSON.stringify(values)
			})
				.then(async (response) => {
					if (response.status >= 300) {
						const data = await response.json();
						throw new Error(data.message);
					}

					authentication.setLoginStatus(Status.fulfilled);
				})
				.catch(() => {
					authentication.setLoginStatus(Status.rejected);
				});
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

	@media (min-width: 768px) {
		form {
			padding: 3rem 4rem;
		}
	}

	@media (min-width: 1024px) {
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
