<script lang="ts">
	import { toggleVisibility } from '$lib/utils/helpers/transitions';
	import { createFormStore } from '$lib/utils/stores/forms/createFormStore';
	import type { FieldTypes } from '$lib/utils/types/form';
	import TextInputGroup from '$lib/elements/form/textInputGroup.svelte';
	import Button from '$lib/elements/form/button.svelte';

	export let isLoginOpened: boolean;

	const fields: FieldTypes[] = [
		{
			hasInvertedColors: true,
			isRequired: true,
			label: 'E-mail',
			name: 'email',
			type: 'email'
		},
		{
			hasInvertedColors: true,
			isRequired: true,
			label: 'Password',
			name: 'password',
			type: 'password',
			validateWith: ['isValidPassword']
		}
	];

	const formStore = createFormStore(fields, 'login');

	function handleSubmit() {
		console.log('BUM', $formStore);
	}
</script>

{#if isLoginOpened}
	<section>
		<form on:submit|preventDefault={handleSubmit} transition:toggleVisibility novalidate>
			{#each fields as { name }}
				<div>
					<TextInputGroup fieldName={name} {formStore} />
				</div>
			{/each}
			<Button type="submit" disabled={!$formStore.summary.isValid}>Send</Button>
		</form>
	</section>
{/if}

<style>
	section {
		display: flex;
		width: 100%;
		height: var(--size-loginbar-height);
		background-color: var(--color-grey-4);
		position: fixed;
		top: var(--size-navbar-height);
		left: 0;
		/* z-index: var(--index-loginbar); */
	}
	form {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		width: var(--size-container-max-width);
		margin: 0 auto;
		padding: 0 2rem;
	}

	div {
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: auto 30rem;
		margin: 1rem;
	}
</style>
