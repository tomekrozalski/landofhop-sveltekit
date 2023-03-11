<script lang="ts">
	import { translate } from 'svelte-intl';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/atoms/forms/Button/Button.svelte';
	import Remove from './Remove.svelte';
	import UpdateRatings from './UpdateRatings.svelte';

	$: ({ badge, brand, shortId } = $page.data.details);
	$: params = `${shortId}/${brand.badge}/${badge}`;

	function updateBeverage() {
		goto(`/dashboard/update-beverage/${params}`);
	}

	function updateBeverageImages() {
		goto(`/dashboard/update-beverage-photos/${params}`);
	}
</script>

<div class="buttons" in:fade>
	<Button handleClick={updateBeverage}>{$translate('beverage.adminBar.updateContent')}</Button>
	<Button handleClick={updateBeverageImages}>{$translate('beverage.adminBar.updateImages')}</Button>
	{#await $page.data.streamed.adminData then adminData}
		<UpdateRatings {adminData} />
	{/await}
	<Remove />
</div>

<style>
	.buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	@media (min-width: 1200px) {
		.buttons {
			flex-direction: row;
		}
	}
</style>
