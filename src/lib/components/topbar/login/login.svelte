<script lang="ts">
	import { toggleVisibility } from '$lib/utils/helpers/transitions';
	import type { FormTypes } from '$lib/utils/types/form';
	import TextInputGroup from '$lib/elements/form/TextInputGroup.svelte';

	export let isLoginOpened: boolean;

	const formData: FormTypes = {
		name: 'login',
		fields: [
			{
				hasInvertedColors: true,
				isRequired: true,
				isTouched: false,
				isValid: false,
				label: 'E-mail',
				name: 'email',
				type: 'email',
				value: ''
			},
			{
				hasInvertedColors: true,
				isRequired: true,
				isTouched: false,
				isValid: false,
				label: 'Password',
				name: 'password',
				type: 'password',
				validateWith: /abc/,
				value: ''
			}
		]
	};

	function handleSubmit() {
		console.log('BUM', formData);
	}
</script>

{#if isLoginOpened}
	<section>
		<form on:submit|preventDefault={handleSubmit} transition:toggleVisibility novalidate>
			{#each formData.fields as field}
				<div>
					<TextInputGroup bind:data={field} />
				</div>
			{/each}
			<button type="submit">Submit</button>
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
