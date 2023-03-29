<script lang="ts">
	import { translate } from 'svelte-intl';
</script>

<div data-scrollsync>
	<ul class="header">
		<li>{$translate('brands.header.name')}</li>
		<li class="withSublist">
			{$translate('brands.header.beveragesSummary')}
			<ul>
				<li>{$translate('brands.header.independently')}</li>
				<li>{$translate('brands.header.asCooperator')}</li>
				<li>{$translate('brands.header.asContractor')}</li>
			</ul>
		</li>
		<li>{$translate('brands.header.averageRate')}</li>
		<li>{$translate('brands.header.points')}</li>
	</ul>
</div>

<style>
	div {
		overflow-x: scroll;
	}

	ul.header {
		min-width: 80rem;

		display: grid;
		grid-template-columns: 3fr 3fr 1fr 1fr;
		border-bottom: 0.1rem solid var(--color-black);
		background-color: var(--color-grey-5);

		position: sticky;
		top: var(--size-header-height);
	}

	li {
		align-self: self-end;
		padding: 0.4rem 1rem;
	}

	li.withSublist {
		padding: 0.8rem 0 0 0;
		text-align: center;
	}

	ul ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border-top: 0.1rem solid var(--color-grey-2);
		margin-top: 0.8rem;
		text-align: left;
	}
</style>
