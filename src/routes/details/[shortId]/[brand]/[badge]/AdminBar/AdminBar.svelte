<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import InlineSpinner from '$lib/atoms/spinners/Inline.svelte';
	import Notes from './Notes.svelte';
	import Updated from './Updated.svelte';
	import Buttons from './Buttons/Buttons.svelte';
	import type { AdminData } from './AdminData.d';

	let adminData: AdminData | null = null;
	let isLoading = true;
	$: ({ badge, brand, shortId } = $page.data.details);

	async function getAdminData() {
		isLoading = true;
		const response = await fetch(`/details/${shortId}/${brand.badge}/${badge}/api/notes`);
		adminData = await response.json();
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
