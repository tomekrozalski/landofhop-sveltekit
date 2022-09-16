<script lang="ts">
	import { onMount } from 'svelte';
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import navigation from '$lib/utils/stores/navigation';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import type { AdminNotes } from '$lib/utils/types/Beverage/AdminNotes.d';
	import InlineSpinner from '$lib/elements/spinners/Inline.svelte';
	import Notes from './Notes.svelte';
	import Updated from './Updated.svelte';
	import Buttons from './Buttons/Buttons.svelte';

	export let details: Details;
	let isLoading = true;
	let adminData: AdminNotes;

	onMount(async () => {
		try {
			adminData = await apiCall(fetch, Endpoints.beverageAdminNotes, {
				pathParams: ['pl', details.shortId]
			});
		} catch (err) {
			if (err.message === 'Forbidden') {
				navigation.logOut();
			}
		}

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
