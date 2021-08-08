<script lang="ts">
	import { translate } from 'svelte-intl';

	export let data: {
		language: string;
		value: string;
	}[];
	export let mode: 'long' | 'short' | 'narrow' = 'narrow';
</script>

{#if mode === 'narrow'}
	{#each data as item, i}
		<slot {item} />{#if i + 2 <= data.length}, {' '}{/if}
	{/each}
{/if}

{#if mode === 'short'}
	{#each data as item, i}
		<slot {item} />
		{#if i + 3 <= data.length}
			,
		{:else if i + 2 === data.length}
			{$translate('beverage.shortConjunction')}{' '}
		{/if}
	{/each}
{/if}

{#if mode === 'long'}
	{#each data as item, i}
		<slot {item} />
		{#if i + 3 <= data.length}
			,
		{:else if i + 2 === data.length}
			{$translate('beverage.longConjunction')}{' '}
		{/if}
	{/each}
{/if}
