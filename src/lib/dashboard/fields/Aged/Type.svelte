<script lang="ts">
	import { translate } from 'svelte-intl';
	import { AgedType } from '$lib/utils/enums/Beverage.enum';
	import List from './List.svelte';

	export let i: number;
	export let updateField: (fieldname: string, type: AgedType) => void;
	export let value: AgedType | null;
</script>

<List>
	{#each Object.values(AgedType) as type}
		<li>
			<input
				id="{type}-{i}"
				name="type-${i}"
				checked={value === type}
				on:change={() => updateField(`aged[${i}].type`, type)}
				type="radio"
			/>
			<label for="{type}-{i}">{$translate(`dashboard.aged.type.${type}`)}</label>
		</li>
	{/each}
</List>
