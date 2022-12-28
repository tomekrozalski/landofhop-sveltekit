<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	$: ({ institution } = $page.data);
	$: ({ asContractor, asCooperator, beverages } = institution.statsData);
</script>

<div>
	<ul>
		<li class="beverages">
			{$translate('brand.legend.beverages')} <span>({beverages})</span>
		</li>
		<li class="cooperator">
			{$translate('brand.legend.cooperator')} <span>({asCooperator})</span>
		</li>
		<li class="contractor">
			{$translate('brand.legend.contractor')} <span>({asContractor})</span>
		</li>
	</ul>
	<a href="/advanced-search?brands={$page.params.shortId}">Zobacz wszystkie piwa marki</a>
</div>

<style>
	div {
		text-align: right;
	}

	ul {
		display: flex;
		justify-content: flex-end;
	}

	li:not(:last-of-type)::after {
		content: ',';
		margin-right: 0.5rem;
	}

	li::before {
		display: inline-block;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		margin-right: 0.5rem;
		transform: translateY(0.5rem);
		content: '';
	}

	li.beverages::before {
		background-color: var(--color-brand-6);
	}

	li.cooperator::before {
		background-color: var(--color-brand-10);
	}

	li.contractor::before {
		background-color: var(--color-brand-5);
	}

	span {
		font-size: 1.5rem;
		color: var(--color-grey-1);
	}

	a {
		font-size: 1.6rem;
		color: var(--color-black);
	}

	a:hover {
		text-decoration: underline;
	}
</style>
