<script lang="ts">
	import { translate } from 'svelte-intl';
	import { StyleGroup } from '$lib/utils/enums/StyleGroup.enum';
	import type { StylesStats as StylesStatsTypes } from '$lib/utils/types/stats/Styles';
	import Item from './item.svelte';

	export let statsData: StylesStatsTypes[];
</script>

<ul class="mainList">
	{#each Object.values(StyleGroup) as group}
		<li>
			<h3>{$translate(`styleGroups.${group}`)}</h3>
			<ul>
				{#each statsData.filter((props) => props.group === group) as item}
					<Item {item} />
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<style>
	ul.mainList {
		margin-top: 6rem;
	}
</style>
