<script lang="ts">
	import { translate } from 'svelte-intl';
	import { onMount } from 'svelte';
	import Spinner from '$lib/atoms/spinners/FullWidth.svelte';
	import ModalWrapper from '../ModalWrapper.svelte';
	import Form from './Form.svelte';
	import type { Input } from './types.d';

	export let close: () => void;
	export let shortId: string;
	let details: Input | null = null;

	onMount(() => {
		fetch(`/api/admin/modals/update-place/${shortId}/get-details`)
			.then((response) => response.json())
			.then((data) => {
				details = data;
			});
	});
</script>

<ModalWrapper {close}>
	<header>
		<h2>{$translate('dashboard.updatePlace')}</h2>
	</header>
	{#if details}
		<Form {close} initialValues={details} {shortId} />
	{:else}
		<Spinner style="margin-top: 4rem" />
	{/if}
</ModalWrapper>
