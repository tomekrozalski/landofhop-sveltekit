<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import FormattedList from '$lib/atoms/FormattedList.svelte';

	$: ({ dryHopped, isDryHopped } = $page.data.details);
</script>

{#if dryHopped || isDryHopped}
	<dt>
		{$translate('beverage.testimonial.dryHopped')}
	</dt>
	<dd>
		{#if isDryHopped?.label}
			<span class="label">
				<em>{$translate('global.confirmation')}</em>
			</span>
		{/if}
		{#if dryHopped?.label}
			<span class="label">
				<FormattedList mode="short" let:item data={dryHopped.label}>
					<MarkLanguage label tag="em" name={item.name} />
				</FormattedList>
			</span>
		{/if}
		{#if isDryHopped?.producer}
			<span class="producer">
				<em>{$translate('global.confirmation')}</em>
			</span>
		{/if}
		{#if dryHopped?.producer}
			<span class="producer">
				<FormattedList mode="short" let:item data={dryHopped.producer}>
					<MarkLanguage producer tag="em" name={item.name} />
				</FormattedList>
			</span>
		{/if}
		{#if isDryHopped?.editorial}
			<span class="editorial">
				<em>{$translate('global.confirmation')}</em>
			</span>
		{/if}
		{#if dryHopped?.editorial}
			<span class="editorial">
				<FormattedList mode="short" let:item data={dryHopped.editorial}>
					<MarkLanguage editorial tag="em" name={item.name} />
				</FormattedList>
			</span>
		{/if}
	</dd>
{/if}
