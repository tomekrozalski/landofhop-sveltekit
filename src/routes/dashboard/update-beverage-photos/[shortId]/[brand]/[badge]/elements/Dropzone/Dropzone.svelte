<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';
	import DropzoneIcon from './Icon.svelte';

	export let isMultiple: boolean = false;
	export let save: (images: File[]) => void;
	let error = '';

	function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;

		if (fileRejections.length) {
			error = `Upload failed. ${fileRejections[0].errors[0].message} (${fileRejections[0].file.name})`;
		} else {
			error = '';
			save(acceptedFiles);
		}
	}
</script>

<Dropzone
	accept="image/jpeg"
	on:drop={handleFilesSelect}
	disableDefaultStyles
	containerClasses="dropzone-wrapper"
	minSize={5000}
	maxSize={2000000}
	multiple={isMultiple}
>
	<DropzoneIcon />
	{#if error}
		<div>{error}</div>
	{/if}
</Dropzone>

<style>
	:global(.dropzone-wrapper) {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 0.2rem dashed var(--color-grey-3);
		transition: border-color var(--transition-default);
		line-height: 0;
		background-color: var(--color-grey-5);
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	:global(.dropzone-wrapper:hover) {
		border-color: var(--color-grey-2);
	}

	:global(.dropzone-wrapper:hover .dark) {
		fill: var(--color-grey-2);
	}

	:global(.dropzone-wrapper:hover .movable) {
		transform: translate(224px, -104px);
	}

	div {
		width: 100%;
		padding: 1rem 2rem;
		background-color: var(--color-danger);
		font: var(--font-weight-regular) 1.5rem / 2rem var(--font-primary);
		color: var(--color-white);
		position: absolute;
		bottom: 0;
		left: 0;
	}
</style>
