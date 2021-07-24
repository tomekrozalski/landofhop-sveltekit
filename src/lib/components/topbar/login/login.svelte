<script lang="ts">
	import { toggleVisibility } from '$lib/utils/helpers/transitions';
	import TextInputGroup from '$lib/elements/form/TextInputGroup.svelte';

	export let isLoginOpened: boolean;

	let email: string;
	let password: string;

	function handleSubmit() {
		console.log('BUM', email, password);
	}
</script>

{#if isLoginOpened}
	<section>
		<form on:submit|preventDefault={handleSubmit} transition:toggleVisibility novalidate>
			<div>
				<TextInputGroup
					isInverted
					isRequired
					label="E-mail"
					name="login-email"
					type="email"
					bind:value={email}
				/>
			</div>
			<div>
				<TextInputGroup
					isInverted
					isRequired
					label="Password"
					name="login-password"
					type="password"
					bind:value={password}
				/>
			</div>
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
