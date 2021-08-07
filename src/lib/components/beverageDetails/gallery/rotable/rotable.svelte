<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { beverage } from '$lib/utils/stores/beverage';
	import prepareCanvas from './prepareCanvas';

	let renderer;

	const brand = $beverage.brand.badge;
	const name = $beverage.badge;
	const shortId = $beverage.shortId;
	const imagesInGallery = $beverage.photos.gallery;

	const { camera, geometry, scene, texturePromises } = prepareCanvas({
		brand,
		imagesInGallery,
		name,
		shortId
	});

	let el;
	let textures;
	let activeTextureIndex = 0;
	let isRotable = false;
	let dragData = {
		beforeXPosition: 0,
		currentXPosition: 0
	};

	function setTexture(val) {
		activeTextureIndex = val;

		const material = new THREE.MeshBasicMaterial({ map: textures[val] });
		const picture = new THREE.Mesh(geometry, material);
		scene.add(picture);

		renderer.render(scene, camera);
	}

	function load360Icon() {
		const iconLoader = new THREE.TextureLoader();

		iconLoader.load(
			'/images/icon360.png',
			(map) => {
				const iconGeometry = new THREE.PlaneGeometry(35, 20);
				const iconMaterial = new THREE.MeshBasicMaterial({ map });
				const icon = new THREE.Mesh(iconGeometry, iconMaterial);
				icon.position.set(89, 237, 1);

				scene.add(icon);
			},
			undefined,
			(err) => console.warn(err)
		);
	}

	let spinner;
	let spinnerTimeout;

	function loadSpinner() {
		const spinnerGeometry = new THREE.CircleGeometry(3, 50);
		const spinnerMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 });
		spinner = new THREE.Mesh(spinnerGeometry, spinnerMaterial);
		spinner.position.set(89, 237, 2);

		function animateSpinner(value, isGrowing = true) {
			spinner.scale.set(value / 10, value / 10);
			scene.add(spinner);
			renderer.render(scene, camera);

			spinnerTimeout = setTimeout(() => {
				animateSpinner(
					(isGrowing && value < 30) || (!isGrowing && value === 10) ? value + 1 : value - 1,
					(isGrowing && value < 30) || (!isGrowing && value === 10)
				);
			}, 15);
		}

		animateSpinner(10);
	}

	function stopSpinner() {
		spinner.scale.set(0, 0);
		clearTimeout(spinnerTimeout);
	}

	onMount(async () => {
		renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: el });
		renderer.setSize(220, 500);
		renderer.setPixelRatio(window.devicePixelRatio >= 2 ? 2 : 1);
		loadSpinner();

		textures = await Promise.all(texturePromises);
		stopSpinner();
		load360Icon();
		rotate(0);
	});

	function rotate(val) {
		let timeout;

		if (val === imagesInGallery) {
			setTexture(0);
			clearTimeout(timeout);
		} else {
			setTexture(val);

			timeout = setTimeout(() => {
				rotate(val + 1);
			}, 10);
		}
	}

	function setTextureByDirection(direction) {
		setTexture(
			direction < 0 ? (imagesInGallery + direction) % imagesInGallery : direction % imagesInGallery
		);
	}

	function onMove(e) {
		if (isRotable && e.clientX !== dragData.currentXPosition) {
			dragData.beforeXPosition = dragData.currentXPosition;
			dragData.currentXPosition = e.clientX;

			setTextureByDirection(
				dragData.beforeXPosition > dragData.currentXPosition
					? activeTextureIndex - 1
					: activeTextureIndex + 1
			);
		}
	}

	function onWheelMove(e) {
		setTextureByDirection(e.deltaY > 0 ? activeTextureIndex + 1 : activeTextureIndex - 1);
	}
</script>

<canvas
	bind:this={el}
	on:pointerup={() => (isRotable = false)}
	on:pointerdown={() => (isRotable = true)}
	on:pointerout={() => (isRotable = false)}
	on:pointermove={onMove}
	on:wheel={onWheelMove}
/>

<style>
	canvas {
		width: 220px;
		height: 500px;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
