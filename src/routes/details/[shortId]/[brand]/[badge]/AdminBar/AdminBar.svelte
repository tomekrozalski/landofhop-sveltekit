<script lang="ts">
	import { page } from '$app/stores';
	import InlineSpinner from '$lib/atoms/spinners/Inline.svelte';
	import Notes from './Notes.svelte';
	import Updated from './Updated.svelte';
	import Buttons from './Buttons/Buttons.svelte';
</script>

<Buttons />
{#await $page.data.streamed.adminData}
	<InlineSpinner />
{:then adminData}
	<div class="adminNotes">
		{#if adminData.notes}<Notes notes={adminData.notes} />{/if}
		{#if adminData.updated}<Updated updated={adminData.updated} />{/if}
	</div>
{/await}

<style>
	.adminNotes {
		margin: 2rem 0;
	}

	.adminNotes :global(p) {
		margin: 0.6rem 0;
	}
</style>
