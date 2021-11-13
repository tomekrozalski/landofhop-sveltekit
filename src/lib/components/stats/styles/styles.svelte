<script lang="ts">
	import { translate } from 'svelte-intl';
	import { StyleGroup } from '$lib/utils/enums/StyleGroup.enum';
	import type { StylesStats as StylesStatsTypes } from '$lib/utils/types/stats/Styles';

	export let statsData: StylesStatsTypes[];
</script>

<ul class="mainList">
	{#each Object.values(StyleGroup) as group}
		<li>
			<h3>{$translate(`styleGroups.${group}`)}</h3>
			<ul>
				{#each statsData.filter((props) => props.group === group) as item}
					<li>
						<em lang={item.name.language}>{item.name.value}</em>,
						<span>{$translate('statsStyles.itemsInDatabase')}</span>
						{item.amount}
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<style>
	ul.mainList {
		margin-top: 6rem;
	}

	em {
		font-style: normal;
	}

	span {
		color: var(--color-grey-1);
	}
</style>
