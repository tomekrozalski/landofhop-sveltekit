<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import type { BrandTimelineData } from '../types.d';

	const timelineData: BrandTimelineData[] = $page.data.timelineData ?? [];
	const beveragesTotal = timelineData.reduce((acc, curr) => acc + (curr.beverages?.length ?? 0), 0);
	const cooperatorTotal = timelineData.reduce(
		(acc, curr) => acc + (curr.asCooperator?.length ?? 0),
		0
	);
	const contractorTotal = timelineData.reduce(
		(acc, curr) => acc + (curr.asContractor?.length ?? 0),
		0
	);
</script>

<ul>
	<li class="beverages">{$translate('brand.legend.beverages')} <span>({beveragesTotal})</span></li>
	<li class="cooperator">
		{$translate('brand.legend.cooperator')} <span>({cooperatorTotal})</span>
	</li>
	<li class="contractor">
		{$translate('brand.legend.contractor')} <span>({contractorTotal})</span>
	</li>
</ul>

<style>
	ul {
		display: flex;
		justify-content: flex-end;
		margin-inline: 2rem;
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
		background-color: var(--color-brand-10-light);
	}

	li.contractor::before {
		background-color: var(--color-brand-5-light);
	}

	span {
		font-size: 1.5rem;
		color: var(--color-grey-1);
	}
</style>
