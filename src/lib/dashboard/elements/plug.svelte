<script lang="ts">
	import { translate } from 'svelte-intl';
	import { cloneDeep } from 'lodash-es';
	import { emptyLanguageValue } from '$lib/dashboard/utils/emptyFieldValues';

	export let formData: any;
	export let fieldName: string;
	export let emptyValue: any = emptyLanguageValue;
	export let wide: boolean = false;
	export let wider: boolean = false;
	let { errors, form, touched } = formData;

	const push = () => {
		$form[fieldName] = $form[fieldName].concat(cloneDeep(emptyValue));
		$errors[fieldName] = $errors[fieldName].concat({});
		$touched[fieldName] = $touched[fieldName].concat({});
	};
</script>

<button class:wide class:wider type="button" on:click={push}>
	{$translate('dashboard.append')}
</button>

<style>
	button {
		grid-column: 2/3;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: var(--color-grey-5);
		color: var(--color-grey-2);
		cursor: crosshair;
	}

	button.wide {
		grid-column: 2/4;
	}

	button.wider {
		grid-column: 2/5;
	}
</style>
