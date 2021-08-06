import * as THREE from 'three';
import { PHOTO_SERVER } from '$lib/utils/constants';

export default function prepareCanvas({ brand, imagesInGallery, name, shortId }) {
	const scene = new THREE.Scene();

	// Set up lights
	const ambientLight = new THREE.AmbientLight();
	scene.add(ambientLight);

	// Set up camera
	const aspectRadio = 220 / 500;
	const cameraWidth = 220;
	const cameraHeight = cameraWidth / aspectRadio;

	const camera = new THREE.OrthographicCamera(
		cameraWidth / -2,
		cameraWidth / 2,
		cameraHeight / 2,
		cameraHeight / -2,
		0,
		1000
	);

	// Set up geometry
	const geometry = new THREE.BoxGeometry(220, 500, 0);

	// Load images
	const basicPath = `${PHOTO_SERVER}/${brand}/${name}/${shortId}`;
	const loader = new THREE.TextureLoader();
	const texturePromises = [];
	const pixelRatio = window.devicePixelRatio && window.devicePixelRatio >= 2 ? '2x' : '1x';

	const textureLinks = new Array(imagesInGallery).fill('').map((_, i) => {
		const order = i + 1;
		const imageName = order < 10 ? `0${order}` : order;
		return `${basicPath}/container/jpg/${pixelRatio}/${imageName}.jpg`;
	});

	textureLinks.forEach((imageLink) => {
		texturePromises.push(
			new Promise((resolve, reject) => {
				loader.load(
					imageLink,
					(texture) => resolve(texture),
					undefined,
					(err) => reject(err)
				);
			})
		);
	});

	return {
		camera,
		geometry,
		scene,
		texturePromises
	};
}
