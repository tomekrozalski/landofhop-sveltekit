<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	const { badge, brand, shortId } = $page.params;
</script>

<ul>
	<li class="details">
		<a href="/details/{shortId}/{brand}/{badge}">
			{$translate('dashboard.navigation.moveToDetails')}
		</a>
	</li>
	<li class="update-data">
		<a href="/dashboard/update-beverage/{shortId}/{brand}/{badge}">
			{$translate('dashboard.navigation.moveToBeverageUpdate')}
		</a>
	</li>
	<li class="update-photos">
		<a href="/dashboard/update-beverage-photos/{shortId}/{brand}/{badge}">
			{$translate('dashboard.navigation.moveToBeveragePhotosUpdate')}
		</a>
	</li>
</ul>

<style>
	ul {
		display: flex;
		justify-content: space-between;
		width: 12rem;
		height: 6rem;
		position: absolute;
		top: 0rem;
		right: 22%;
	}

	li {
		display: inline-block;
		width: 3rem;
		position: relative;
	}

	li.details {
		height: 6rem;
	}

	li.update-data {
		height: 5rem;
	}

	li.update-photos {
		height: 4rem;
	}

	li::before {
		display: inline-block;
		content: '';
		width: 0.4rem;
		height: 4rem;
		transition: background-color var(--transition-default);
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	li.details::before {
		background-color: var(--color-brand-1);
	}

	li.update-data::before {
		background-color: var(--color-brand-5);
	}

	li.update-photos::before {
		background-color: var(--color-brand-10);
	}

	li:hover::before {
		background-color: var(--color-black);
	}

	a {
		display: inline-block;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		overflow: hidden;
		transition: background-color var(--transition-default);
		position: absolute;
		bottom: 0;
		left: 0;
	}

	li.details a {
		background-color: var(--color-brand-1);

		transition: transform var(--transition-default);
	}

	li.update-data a {
		background-color: var(--color-brand-5);
	}

	li.update-photos a {
		background-color: var(--color-brand-10);
	}

	li:hover a {
		background-color: var(--color-black);
		transform: translateY(0.5rem);
	}

	a::before {
		display: block;
		content: '';
		width: 100%;
		height: 100%;
	}
</style>
