<script lang="ts">
	import { translate } from 'svelte-intl';
	import Markdown from '$lib/atoms/Markdown.svelte';
	import InfoIcon from './InfoIcon.svelte';

	export let messageKey: string;
</script>

<aside>
	<i>
		<InfoIcon />
	</i>
	<div>
		<Markdown value={$translate(messageKey)} />
	</div>
</aside>

<style>
	aside {
		display: inline-flex;
		position: relative;
	}

	i {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background-color: var(--color-black);
		color: var(--color-white);
	}

	i :global(svg) {
		height: 50%;
		fill: var(--color-white);
	}

	div {
		width: 28rem;
		border: 1px solid #333;
		padding: 0.2rem 1.6rem;
		background-color: var(--color-white);
		font-size: 1.6rem;
		line-height: 2.5rem;
		text-align: left;
		position: absolute;
		top: -1.5rem;
		left: -8rem;
		transform: translateY(-100%);
		z-index: 1;
		visibility: hidden;
	}

	div::before {
		display: inline-block;
		width: 0;
		height: 0;
		border-left: 1rem solid transparent;
		border-right: 1rem solid transparent;
		border-top: 1rem solid var(--color-black);
		content: '';
		position: absolute;
		bottom: -1rem;
		left: 8rem;
	}

	aside:hover div {
		visibility: visible;
	}
</style>
