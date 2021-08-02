<script lang="ts">
	import navigation from '$lib/utils/stores/navigation';
	import { createFormStore } from '$lib/utils/stores/forms/createFormStore';
	import type { FieldTypes } from '$lib/utils/types/form';
	import Status from '$lib/utils/enums/Status.enum';
	import TextInputGroup from '$lib/elements/form/textInputGroup.svelte';
	import Button from '$lib/elements/form/button.svelte';

	const fields: FieldTypes[] = [
		{
			hasInvertedColors: true,
			isRequired: true,
			label: 'E-mail',
			name: 'email',
			type: 'email',
			validateWith: ['isValidEmail']
		},
		{
			hasInvertedColors: true,
			isRequired: true,
			label: 'Hasło',
			name: 'password',
			type: 'password',
			validateWith: ['isValidPassword']
		}
	];

	const formStore: any = createFormStore(fields, 'login');

	function handleSubmit() {
		navigation.setLoginStatus(Status.pending);

		fetch('/auth/login.json', {
			method: 'POST',
			body: JSON.stringify({
				email: $formStore.fields.email.value,
				password: $formStore.fields.password.value
			})
		})
			.then(async (response) => {
				const data = await response.json();

				if (response.status >= 300) {
					throw new Error(data);
				}

				return data;
			})
			.then(() => {
				navigation.setLoginStatus(Status.fulfilled);
			})
			.catch(() => {
				navigation.setLoginStatus(Status.rejected);
			});
	}
</script>

<form on:submit|preventDefault={handleSubmit} novalidate>
	{#each fields as { name }}
		<div class="input-group">
			<TextInputGroup fieldName={name} {formStore} />
		</div>
	{/each}
	<div class="button-wrapper">
		<Button type="submit" disabled={!$formStore.summary.isValid}>Wyślij</Button>
	</div>
</form>

<style>
	form {
		flex-direction: column;
	}

	.input-group {
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
		.input-group {
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
