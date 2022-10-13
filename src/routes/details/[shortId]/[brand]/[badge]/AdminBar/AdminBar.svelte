<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { getJsonData } from '$lib/utils/api/communication';
	import InlineSpinner from '$lib/atoms/spinners/Inline.svelte';
	import Notes from './Notes.svelte';
	import Updated from './Updated.svelte';
	import Buttons from './Buttons/Buttons.svelte';
	import type { AdminData } from './AdminData.d';

	let adminData: AdminData | null = null;
	let isLoading = true;

	async function getAdminData() {
		isLoading = true;

		adminData = await getJsonData({
			path: `/api/admin/beverages/notes/pl/${$page.data.details.shortId}`
		});

		isLoading = false;
	}

	onMount(getAdminData);
	afterNavigate(getAdminData);
</script>

<Buttons {adminData} />
{#if isLoading}
	<InlineSpinner />
{:else if adminData}
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
