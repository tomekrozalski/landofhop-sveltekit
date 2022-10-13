<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import FormattedList from '$lib/atoms/FormattedList.svelte';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';

	$: ({ styleTags } = $page.data.details);
</script>

{#if styleTags}
	<dt>
		{$translate('beverage.testimonial.styleTags')}
	</dt>
	<dd>
		<span>
			<FormattedList mode="narrow" let:item data={styleTags.editorial}>
				<MarkLanguage
					editorial
					tag="a"
					href="/advanced-search?styleTags={item.badge}"
					name={item.name}
				/>
			</FormattedList>
		</span>
	</dd>
{/if}
