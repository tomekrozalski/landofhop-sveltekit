<script lang="ts">
	import { translate } from 'svelte-intl';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{$translate('brands.title')}</title>
</svelte:head>

<article>
	<h1>{$translate('brands.title')}</h1>
	<table>
		<tr>
			<th>Nazwa</th>
			<th>ilość piw</th>
			<th>jako kooperant</th>
			<th>jako kontraktor</th>
			<th>średnia ocena</th>
			<th>punty</th>
		</tr>
		{#each data.insitutions as { avgRating, badge, name, shortId }}
			<tr>
				<td><MarkLanguage href="/brand/{shortId}/{badge}" tag="a" {name} /></td>
				<td>x</td>
				<td>x</td>
				<td>x</td>
				<td><strong style="color: red">{avgRating}</strong></td>
				<td>x</td>
			</tr>
		{/each}
	</table>
</article>

<style>
	li {
		display: inline;
	}

	li:not(:last-of-type)::after {
		content: ', ';
	}

	li :global(a) {
		color: var(--color-black);
	}

	li :global(a:hover) {
		text-decoration: underline;
	}
</style>
