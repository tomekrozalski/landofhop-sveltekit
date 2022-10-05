<script lang="ts">
	import SelectWrapper from './SelectWrapper.svelte';

	export let errors: string;
	export let name: string;
	export let updateField: (fieldName: string, value: any) => void;
	export let validateField: (fieldName: string) => void;
	export let value: string;

	const items = [
		{
			label: 'PLN',
			value: 'PLN'
		}
	];

	function handleClear() {
		updateField(name, '');
	}

	function setValue(event: any) {
		updateField(name, event.detail.value);
		validateField(name);
	}
</script>

<SelectWrapper
	{errors}
	{handleClear}
	isDisabled={value === null}
	{items}
	{setValue}
	value={items[0]}
/>
