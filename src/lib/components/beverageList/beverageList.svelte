<script lang="ts">
	import type { Basics } from '$lib/utils/types/Beverage/Basics';

	export let beverages: Basics[];
</script>

<ul>
	{#each beverages as beverage}
		<li>
			<!-- <a href={`/details/${beverage.shortId}/${beverage.brand.badge}/${beverage.badge}`}> -->
			{#if beverage.photos?.cover}
				{beverage.badge}
				<!-- <BeverageCoverImage
						badge={badge}
						brand={brand}
						name={name}
						outline={photos.outlines?.cover}
						shortId={shortId}
						ratio={
							(photos?.cover?.height / photos?.cover?.width) * 100
						}
						type={ImageType.cover}
					/> -->
			{:else}
				<div>broken</div>
				<!-- <img
						className={styles.brokenContainer}
						src={`${process.env.NEXT_PUBLIC_PHOTO_SERVER}/broken-${container.type}.svg`}
						alt={formatMessage({ id: 'errors.imageNotFound' })}
					/> -->
			{/if}
			<!-- </a> -->
		</li>
	{/each}
</ul>

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, 160px);
		grid-gap: 1rem;
		justify-content: center;
		align-items: flex-end;
		max-width: var(--size-container-max-width);
		padding: 2rem 1rem;
		margin: 0 auto 6rem auto;
	}

	li {
		display: flex;
		justify-content: center;
		padding-top: 2rem;
		position: relative;
		content-visibility: auto;
		contain-intrinsic-size: 0 35rem;
	}

	/* a {
		width: 100%;
		text-align: center;
	} */

	div {
		transform: scale(1);
		transition: transform var(--transition-default);
	}

	/* a:hover > div {
		transform: scale(0.9);
	} */

	/* .brokenContainer {
		height: 22rem;
		margin: 4rem 0;
		transform: scale(1);
		transition: transform var(--transition-default);
		fill: var(--color-grey-1);
	} */

	@media (--xl) {
		ul {
			grid-template-columns: repeat(auto-fill, 220px);
		}

		li {
			contain-intrinsic-size: 0 45rem;
		}

		/* .brokenContainer {
			height: 28rem;
		} */
	}
</style>
