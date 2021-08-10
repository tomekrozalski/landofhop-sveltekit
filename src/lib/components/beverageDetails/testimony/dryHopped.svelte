<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import MarkLanguage from '$lib/elements/markLanguage.svelte';
	import FormattedList from '$lib/elements/formattedList.svelte';

	export let details: Details;
	const { dryHopped, isDryHopped } = details;
</script>

{#if isDryHopped}
	<dt>
		{$translate('beverage.testimonial.dryHopped')}
	</dt>
	<dd>
		{#if isDryHopped.label}
			<span class="label">
				{#if dryHopped?.label}
					<FormattedList mode="short" let:item data={dryHopped.label}>
						<MarkLanguage label tag="em" name={item} />
					</FormattedList>
				{:else}
					<em>
						{$translate('global.confirmation')}
					</em>
				{/if}
			</span>
		{/if}
		{#if isDryHopped.producer}
			<span class="producer">
				{#if dryHopped?.producer}
					<FormattedList mode="short" let:item data={dryHopped.producer}>
						<MarkLanguage producer tag="em" name={item} />
					</FormattedList>
				{:else}
					<em>
						{$translate('global.confirmation')}
					</em>
				{/if}
			</span>
		{/if}
	</dd>
{/if}
