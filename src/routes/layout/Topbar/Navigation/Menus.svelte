<script lang="ts">
	import { translate } from 'svelte-intl';
	import authentication from '$lib/utils/stores/authentication';
	import LockIcon from './icons/Lock.svelte';
	import UnlockIcon from './icons/Unlock.svelte';
	import layoutStore from '../../utils/store';

	function logOut() {
		fetch('/api/user/logout')
			.then(authentication.logOut)
			.catch(() => console.warn('Log out failed'));
	}
</script>

<ul>
	<li>
		{#if $authentication.isLoggedIn}
			<button class="unlock-button" on:click={logOut}>
				<UnlockIcon />
				{$translate('navigation.logout')}
			</button>
		{:else}
			<button on:click={layoutStore.toggleLoginbar}>
				<LockIcon />
				{$translate('navigation.login')}
			</button>
		{/if}
	</li>
	<li><a href="/about">{$translate('navigation.about')}</a></li>
	<li><a href="/stats">{$translate('navigation.stats')}</a></li>
	{#if $authentication.isLoggedIn}
		<li>
			<a href="/dashboard/add-new-beverage">
				{$translate('navigation.addNewBeverage')}
			</a>
		</li>
	{/if}
</ul>
<ul class="languages">
	<li><a href="/">PL</a></li>
	<li><span class="disabled-link" href="/">EN</span></li>
</ul>

<style>
	ul {
		display: flex;
		padding: 0.5rem 0;
	}

	ul.languages {
		justify-content: flex-end;
	}

	li {
		display: flex;
	}

	a,
	button,
	.disabled-link {
		display: flex;
		align-items: center;
		padding: 1rem;
		background-color: var(--color-white);
		color: var(--color-black);
		transition: color var(--transition-default), background-color var(--transition-default);
	}

	.disabled-link {
		background-color: var(--color-grey-4);
		color: var(--color-grey-1);
		cursor: not-allowed;
	}

	button {
		padding: 1rem 1rem 1rem 3rem;
		position: relative;
	}

	a:hover,
	button:hover {
		background-color: var(--color-black);
		color: var(--color-white);
	}

	button :global(svg) {
		width: 1.2rem;
		position: absolute;
		top: 50%;
		left: 1rem;
		transform: translateY(-50%);
	}

	button.unlock-button :global(svg) {
		transform: translateY(calc(-50% - 0.2rem));
	}

	button :global(svg path) {
		fill: var(--color-black);
		transition: fill var(--transition-default);
	}

	button:hover :global(svg path) {
		fill: var(--color-white);
	}
</style>
