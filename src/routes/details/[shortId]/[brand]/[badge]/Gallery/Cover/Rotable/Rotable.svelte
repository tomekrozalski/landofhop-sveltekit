<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { derived, writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import Group from './Group.svelte';
	import RotableIcon from './RotableIcon.svelte';
	import RotableSpinner from './RotableSpinner.svelte';

	let areImagesLoaded = false;
	let isRotable = false;
	let dragData = {
		beforeXPosition: 0,
		currentXPosition: 0
	};

	$: imagesInGallery = $page.data.details.photos.gallery;

	const point = tweened<number>(1, {
		delay: 1500,
		duration: 1500,
		easing: sineInOut
	});

	const selectedImage = writable<number>(0);

	const actualImage = derived<[Tweened<number>, Writable<number>], number>(
		[point, selectedImage],
		([$point, $selectedImage]) => Math.round(($point + $selectedImage) % imagesInGallery) + 1
	);

	const turnLeft = () => {
		selectedImage.update((index) => (index - 1 === 0 ? imagesInGallery : index - 1));
	};

	const turnRight = () => {
		selectedImage.update((index) => (index + 1 > imagesInGallery ? 1 : index + 1));
	};

	const onWheelMove = (e: WheelEvent) => {
		e.deltaY > 1 ? turnRight() : turnLeft();
	};

	const onMove = (e: MouseEvent) => {
		if (isRotable && e.clientX !== dragData.currentXPosition) {
			dragData.beforeXPosition = dragData.currentXPosition;
			dragData.currentXPosition = e.clientX;

			if (dragData.beforeXPosition < dragData.currentXPosition) {
				turnRight();
			} else {
				turnLeft();
			}
		}
	};

	$: if (areImagesLoaded) {
		point.set(imagesInGallery);
	}
</script>

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
	<Group image={$actualImage} bind:areImagesLoaded />
</div>

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
