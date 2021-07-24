<script lang="ts">
	import { toggleVisibility } from '$lib/utils/helpers/transitions';
	import { makeFormStore } from '$lib/utils/makeFormStore';
	import TextInputGroup from '$lib/elements/form/textInputGroup.svelte';
	import Button from '$lib/elements/form/button.svelte';

	export let isLoginOpened: boolean;

	const formStore = makeFormStore([
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
			validateWith: [
				{
					errorMessage: 'The password should contain three letters',
					regex: /abc/
				}
			]
		}
	]);

	function handleSubmit() {
		console.log('BUM');
	}
</script>

{#if isLoginOpened}
	<section>
		<form on:submit|preventDefault={handleSubmit} transition:toggleVisibility novalidate>
			<div>
				<TextInputGroup fieldName="email" {formStore} />
			</div>
			<div>
				<TextInputGroup fieldName="password" {formStore} />
			</div>
			<Button type="submit">Send</Button>
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
