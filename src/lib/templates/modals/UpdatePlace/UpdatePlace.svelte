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
		fetch(`/api/admin/modals/update-place/get-details/${shortId}`)
			.then((response) => response.json())
			.then((data) => {
				console.log('shortId', shortId, data);
				details = data;
			})
			.catch((e) => {
				console.error(e);
			});
	});
</script>

<ModalWrapper {close}>
	<header>
		<h2>{$translate('dashboard.updatePlace')}</h2>
	</header>
	{#if details}
		<Form {close} initialValues={details} />
	{:else}
		<Spinner style="margin-top: 4rem" />
	{/if}
</ModalWrapper>
