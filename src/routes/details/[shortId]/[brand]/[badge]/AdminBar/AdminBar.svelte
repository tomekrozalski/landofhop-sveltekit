<script lang="ts">
	import { onMount } from 'svelte';
	import { getJsonData } from '$lib/utils/api/communication';
	import type { Details } from 'src/oldTypes/Beverage/Details';
	import type { AdminNotes } from 'src/oldTypes/Beverage/AdminNotes';
	import InlineSpinner from '$lib/atoms/spinners/Inline.svelte';
	import Notes from './Notes.svelte';
	import Updated from './Updated.svelte';
	import Buttons from './Buttons/Buttons.svelte';

	export let details: Details;
	let isLoading = true;
	let adminData: AdminNotes;

	onMount(async () => {
		adminData = await getJsonData({
			path: `/api/admin/beverages/notes/pl/${details.shortId}`
		});

		isLoading = false;
	});
</script>

{#if isLoading}
	<InlineSpinner />
{:else}
	<Buttons {adminData} {details} />
	<div class="adminNotes">
		{#if adminData.notes}<Notes notes={adminData.notes} />{/if}
		{#if adminData.updated}<Updated updated={adminData.updated} />{/if}
	</div>
{/if}

<style>
	.adminNotes {
		margin: 2rem 0;
	}

	.adminNotes :global(p) {
		margin: 0.6rem 0;
	}
</style>
