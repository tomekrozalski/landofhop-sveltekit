<script lang="ts">
	import { onMount } from 'svelte';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import Group from './group.svelte';
	import RotableIcon from './rotableIcon.svelte';
	import RotableSpinner from './rotableSpinner.svelte';

	let mounted = false;
	let areImagesLoaded = false;
	let isRotable = false;
	let dragData = {
		beforeXPosition: 0,
		currentXPosition: 0
	};

	onMount(() => {
		// Render only client-side
		mounted = true;
	});

	export let details: Details;
	const imagesInGallery = details.photos.gallery;

	let currentlyVisibleImageIndex = 1;

	function turnLeft() {
		currentlyVisibleImageIndex =
			currentlyVisibleImageIndex - 1 === 0 ? imagesInGallery : currentlyVisibleImageIndex - 1;
	}

	function turnRight() {
		currentlyVisibleImageIndex =
			currentlyVisibleImageIndex + 1 > imagesInGallery ? 1 : currentlyVisibleImageIndex + 1;
	}

	function onWheelMove(e) {
		e.deltaY > 1 ? turnRight() : turnLeft();
	}

	function onMove(e) {
		if (isRotable && e.clientX !== dragData.currentXPosition) {
			dragData.beforeXPosition = dragData.currentXPosition;
			dragData.currentXPosition = e.clientX;

			if (dragData.beforeXPosition < dragData.currentXPosition) {
				turnRight();
			} else {
				turnLeft();
			}
		}
	}

	function rotate() {
		setTimeout(() => {
			turnRight();

			if (currentlyVisibleImageIndex !== 1) {
				rotate();
			}
		}, 15);
	}

	$: if (areImagesLoaded) {
		rotate();
	}
</script>

{#if mounted}
	<div
		on:pointerup={() => (isRotable = false)}
		on:pointerdown={() => (isRotable = true)}
		on:pointerout={() => (isRotable = false)}
		on:pointermove={onMove}
		on:wheel={onWheelMove}
	>
		{#if areImagesLoaded}
			<RotableIcon />
		{:else}
			<RotableSpinner />
		{/if}
		<Group {currentlyVisibleImageIndex} {details} bind:areImagesLoaded />
	</div>
{/if}

<style>
	div {
		width: 220px;
		height: 500px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		cursor: ew-resize;
	}
</style>
