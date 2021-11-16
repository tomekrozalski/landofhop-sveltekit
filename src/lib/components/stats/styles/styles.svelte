<script lang="ts">
	import { translate } from 'svelte-intl';

	import { StyleGroup } from '$lib/utils/enums/StyleGroup.enum';
	import type { StylesStats as StylesStatsTypes } from '$lib/utils/types/stats/Styles';
	import Spinner from '$lib/elements/spinner.svelte';
	import UpdateStyle from '$lib/dashboard/modals/updateStyle/updateStyle.svelte';
	import Item from './item.svelte';

	export let statsData: StylesStatsTypes[];

	let isModalOpen = false;
	let isModalLoading = false;
	let modalData = null;

	function onUpdateClick() {
		isModalLoading = true;

		setTimeout(() => {
			modalData = {
				badge: '',
				name: [{ value: 's', language: 'pl' }],
				group: ''
			};

			isModalOpen = true;
			isModalLoading = false;
		}, 2000);
	}
</script>

{#if isModalLoading}
	<Spinner />
{:else}
	<ul class="mainList">
		{#each Object.values(StyleGroup) as group}
			<li>
				<h3>{$translate(`styleGroup.${group}`)}</h3>
				<ul>
					{#each statsData.filter((props) => props.group === group) as item}
						<Item {item} {onUpdateClick} />
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
{/if}
{#if isModalOpen}
	<UpdateStyle initialValues={modalData} close={() => (isModalOpen = false)} />
{/if}

<style>
	ul.mainList {
		margin-top: 6rem;
	}
</style>
