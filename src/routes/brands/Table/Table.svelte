<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import Header from './Header.svelte';
	import Points from './Points.svelte';
	import { scrollLeft } from './store';

	$: insitutions = $page.data.insitutions;

	let scrollArea: HTMLElement;
	let isHeaderFixed = false;

	$: {
		if (scrollArea) {
			scrollArea.scrollLeft = $scrollLeft;
		}
	}

	const setScrollPosition = (event: Event) => {
		const element = event.target as HTMLDivElement;
		scrollLeft.set(element.scrollLeft);
	};

	const setHeaderAndScroll = () => {
		const headerHeight = document.querySelector('header')?.offsetHeight ?? 0;
		const distanceFromTop = scrollArea.getBoundingClientRect().top;
		isHeaderFixed = distanceFromTop - headerHeight < 0;
	};

	onMount(() => {
		if (browser) {
			document.addEventListener('scroll', setHeaderAndScroll);
			scrollArea.addEventListener('scroll', setScrollPosition);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('scroll', setHeaderAndScroll);
			scrollArea.removeEventListener('scoll', setScrollPosition);
		}
	});
</script>

<section bind:this={scrollArea} data-scrollsync>
	<Header {isHeaderFixed} />
	{#each insitutions as { badge, name, shortId, statsData }}
		{@const { asContractor, asCooperator, avrScore, beverages, points } = statsData}
		<a href="/brand/{shortId}/{badge}">
			<div><MarkLanguage tag="span" {name} /></div>
			<div class="independently">{beverages || '-'}</div>
			<div>{asCooperator || '-'}</div>
			<div class="contractor">{asContractor || '-'}</div>
			<div>
				{#if avrScore}
					{new Intl.NumberFormat('pl', { maximumSignificantDigits: 3 }).format(avrScore.value)}
				{:else}
					-
				{/if}
			</div>
			<div>
				<Points value={points.value} />
			</div>
		</a>
	{/each}
</section>

<style>
	section {
		width: 100%;
		max-width: var(--size-container-max-width);
		margin: 0 auto 8rem auto;
		overflow-x: scroll;
	}

	a {
		display: grid;
		grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr;
		border-bottom: 0.1rem solid var(--color-grey-3);
		min-width: 80rem;
	}

	a:hover {
		background-color: var(--color-brand-6);
		color: var(--color-white);
	}

	div {
		display: flex;
		align-items: center;
		padding: 0.4rem 1rem;
	}

	div:not(:first-of-type) {
		font-size: 1.5rem;
	}

	div.independently {
		border-left: 0.1rem solid var(--color-grey-4);
	}

	div.contractor {
		border-right: 0.1rem solid var(--color-grey-4);
	}

	section :global(a) {
		color: var(--color-black);
	}

	@media (min-width: 1024px) {
		section {
			overflow-x: unset;
		}
	}
</style>
