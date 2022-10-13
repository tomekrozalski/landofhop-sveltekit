<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	$: ({ type, material, color, value, unit } = $page.data.details.container);
</script>

<dt>
	{$translate('beverage.testimonial.container')}
</dt>
<dd>
	<em class="label">
		{$translate(`beverage.testimonial.container.type.${type}`)}
		{$translate(`beverage.testimonial.container.material.${material}`)}
		{$translate(`beverage.testimonial.container.color.${color}`)}
		{$translate('beverage.testimonial.container.value', { value, unit })}
	</em>
</dd>
