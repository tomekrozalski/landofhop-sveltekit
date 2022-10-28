<script lang="ts">
	import { translate } from 'svelte-intl';
</script>

<ul>
	<li class="beverages">{$translate('brand.legend.beverages')}</li>
	<li class="cooperator">{$translate('brand.legend.cooperator')}</li>
	<li class="contractor">{$translate('brand.legend.contractor')}</li>
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
</style>
