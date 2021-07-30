<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { createFormStore } from '$lib/utils/stores/forms/createFormStore';
	import type { FieldTypes } from '$lib/utils/types/form';
	import Status from '$lib/utils/enums/Status.enum';
	import TextInputGroup from '$lib/elements/form/textInputGroup.svelte';
	import Button from '$lib/elements/form/button.svelte';

	export let isLoginOpened: boolean;

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
	let status = Status.idle;

	function handleSubmit() {
		status = Status.pending;

		const formData = {
			email: $formStore.fields.email.value,
			password: $formStore.fields.password.value
		};

		fetch('/auth/login.json', {
			method: 'POST',
			body: JSON.stringify(formData)
		})
			.then((response) => response.json())
			.then((data) => {
				console.log({ data });
				status = Status.fulfilled;
			})
			.catch((err) => {
				console.log('->', err);
				status = Status.rejected;
			});
	}
</script>

{#if isLoginOpened}
	<section transition:slide={{ duration: 200, easing: cubicInOut }}>
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
	</section>
{/if}

<style>
	section {
		display: flex;
		width: 100%;
		background-color: var(--color-grey-4);
		position: fixed;
		top: var(--size-navbar-height);
		left: 0;
		z-index: var(--index-loginbar);
	}

	form {
		display: flex;
		flex-direction: column;
		width: var(--size-container-max-width);
		height: var(--size-loginbar-height);
		margin: 0 auto;
		padding: 1rem 2rem;
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
