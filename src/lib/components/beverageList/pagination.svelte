<script lang="ts">
	export let order: number;
	export let total: number;
	let pagesCount = Math.ceil(total / 60);

	const getStartingPoint = () => {
		if (order <= 5) {
			return 1;
		}

		if (order + 2 >= pagesCount) {
			return pagesCount - 4;
		}

		return order - 2;
	};

	$: pages = new Array(order === 5 || order === pagesCount - 4 ? 5 : 4)
		.fill('')
		.reduce((acc) => [...acc, acc.pop() + 1], [getStartingPoint()]);
</script>

<ul>
	<li>
		{#if order === 1}
			<span class="inactive">←</span>
		{:else}
			<a
				sveltekit:prefetch
				sveltekit:noscroll
				class="active"
				href={order > 2 ? `/list/${order - 1}` : '/'}>←</a
			>
		{/if}
	</li>

	{#if order > 5}
		<li>
			<a sveltekit:prefetch sveltekit:noscroll class="active" href="/">1</a>
		</li>
		<li>
			<span class="inactive">…</span>
		</li>
	{/if}

	{#each pages as page}
		<li>
			<a
				sveltekit:prefetch
				sveltekit:noscroll
				class="active"
				class:current={page === order}
				href={page === 1 ? '/' : `/list/${page}`}
			>
				{page}
			</a>
		</li>
	{/each}

	{#if pagesCount > order + 4}
		<li>
			<span class="inactive">…</span>
		</li>
	{/if}

	{#if pagesCount > order + 2}
		<li>
			<a sveltekit:prefetch sveltekit:noscroll class="active" href="/list/{pagesCount}">
				{pagesCount}
			</a>
		</li>
	{/if}

	<li>
		{#if pagesCount === order}
			<span class="inactive">→</span>
		{:else}
			<a sveltekit:prefetch sveltekit:noscroll class="active" href="/list/{order + 1}">→</a>
		{/if}
	</li>
</ul>

<style>
	ul {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		max-width: var(--size-container-max-width);
		margin: 6rem 0;
	}

	li {
		width: 100%;
		margin: 1rem;
	}

	a,
	span {
		display: block;
		padding: 1rem;
		border: 1px solid var(--color-grey-2);
		background-color: var(--color-grey-2);
		font-size: 1.6rem;
		line-height: 1;
		color: var(--color-white);
		text-align: center;
	}

	a:hover:not(.inactive),
	span:hover:not(.inactive) {
		background-color: var(--color-white);
		color: var(--color-black);
	}

	.active {
		background-color: var(--color-grey-4);
		color: var(--color-grey-1);
		transition: background-color var(--transition-default), color var(--transition-default);
	}

	.inactive {
		cursor: not-allowed;
	}

	.current {
		background: var(--color-black);
		color: var(--color-white);
		border-color: var(--color-black);
	}

	@media (--sm) {
		ul {
			margin: 6rem auto;
		}

		li {
			width: auto;
			margin: 0.5rem;
		}

		a,
		span {
			display: inline-block;
			padding: 0.8rem 1.5rem;
		}
	}

	@media (--lg) {
		a,
		span {
			display: inline-block;
			padding: 0.5rem 1rem;
		}
	}

	@media (--xl) {
		ul {
			margin: 12rem auto 8rem auto;
		}
	}
</style>
