<script lang="ts">
	import { translate } from 'svelte-intl';
	import { StyleGroup } from '$lib/utils/enums/StyleGroup.enum';
	import { styleStore } from '$lib/utils/stores/selects';
	import type { Style } from '$lib/utils/types/Style';
	import UpdateStyle from '$lib/templates/modals/UpdateStyle/UpdateStyle.svelte';
	import type { StylesStats as StylesStatsTypes } from '$lib/utils/types/stats/Styles';
	import Item from './Item.svelte';

	export let data: StylesStatsTypes[];
	let isModalOpen = false;
	let modalData: Style | null = null;

	async function onUpdateClick(badge: string) {
		modalData = $styleStore.find((props) => props.badge === badge) as Style;
		isModalOpen = true;
	}
</script>

<ul class="mainList">
	{#each Object.values(StyleGroup) as group}
		<li>
			<h3>{$translate(`styleGroup.${group}`)}</h3>
			<ul>
				{#each data.filter((props) => props.group === group) as item}
					<Item {item} {onUpdateClick} />
				{/each}
			</ul>
		</li>
	{/each}
</ul>
{#if isModalOpen && modalData}
	<UpdateStyle initialValues={modalData} close={() => (isModalOpen = false)} />
{/if}

<style>
	ul.mainList {
		margin-top: 4rem;
	}

	h3 {
		font-weight: var(--font-weight-medium);
	}
</style>
