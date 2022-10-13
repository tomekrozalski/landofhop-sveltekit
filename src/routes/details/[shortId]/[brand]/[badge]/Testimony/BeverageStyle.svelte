<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import FormattedList from '$lib/atoms/FormattedList.svelte';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';

	$: ({ style } = $page.data.details);
</script>

{#if style}
	<dt>
		{$translate('beverage.testimonial.style')}
	</dt>
	<dd>
		{#if style?.label}
			<span>
				<FormattedList mode="narrow" let:item data={style.label}>
					<MarkLanguage label tag="em" name={item} />
				</FormattedList>
			</span>
		{/if}
		{#if style?.producer}
			<span>
				<FormattedList mode="narrow" let:item data={style.producer}>
					<MarkLanguage producer tag="em" name={item} />
				</FormattedList>
			</span>
		{/if}
	</dd>
{/if}
