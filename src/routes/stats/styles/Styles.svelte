<script lang="ts">
	import { translate } from 'svelte-intl';
	import { styleStore } from '$lib/utils/stores/selects';
	import UpdateStyle from '$lib/templates/modals/UpdateStyle/UpdateStyle.svelte';
	import { formatLanguageValueFromDb } from '$lib/utils/normalizers/language';
	import type { Style as StyleType } from '$lib/utils/stores/types/Style.d';
	import type { StylesStats as StylesStatsTypes } from 'src/routes/stats/styles/Styles';
	import Item from './Item.svelte';

	export let data: StylesStatsTypes[];
	let isModalOpen = false;
	let modalData: StyleType | null = null;

	async function onUpdateClick(badge: string) {
		modalData = $styleStore.find((props) => props.badge === badge) as StyleType;
		isModalOpen = true;
	}

	const styleGroups = [
		'british-and-irish-ales',
		'the-lager-family',
		'continental-ales-weissbiers-and-ale-lager-hybrids',
		'the-beers-of-belgium',
		'craft-beer-in-america-and-beyond',
		'a-sip-beyond'
	]; // @ToDo it should come from DB
</script>

<ul class="mainList">
	{#each styleGroups as group}
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
	<UpdateStyle
		initialValues={{
			...modalData,
			name: formatLanguageValueFromDb(modalData.name)
		}}
		close={() => (isModalOpen = false)}
	/>
{/if}

<style>
	ul.mainList {
		margin-top: 4rem;
	}

	h3 {
		font-weight: var(--font-weight-medium);
	}
</style>
