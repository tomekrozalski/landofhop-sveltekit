<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';
	import DropzoneIcon from './icon.svelte';

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;

		console.log('!', e.detail);
		// files.accepted = [...files.accepted, ...acceptedFiles];
		// files.rejected = [...files.rejected, ...fileRejections];
	}
</script>

<Dropzone on:drop={handleFilesSelect} disableDefaultStyles containerClasses="dropzone-wrapper">
	<DropzoneIcon />
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
</style>
