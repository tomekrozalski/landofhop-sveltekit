import aws from 'aws-sdk';
import sharp from 'sharp';
import { getSize, getWidth } from './getSize';

const s3 = new aws.S3({});

export function saveGalleryJpg(containerPath, image, size, fileName) {
	return new Promise((resolve, reject) => {
		sharp(image)
			.jpeg({})
			.resize(getWidth(size))
			.toBuffer()
			.then((data) => {
				return s3.upload(
					{
						Bucket: 'land-of-hop-images',
						Key: `${containerPath}/container/jpg/${getSize(size)}/${fileName}.jpg`,
						Body: data,
						CacheControl: 'max-age=31536000',
						ACL: 'public-read'
					},
					(errors, data) => {
						if (errors) {
							reject(errors);
						} else {
							resolve(data);
						}
					}
				);
			})
			.catch((err) => {
				console.log({ err });
				reject('err');
			});
	});
}

export function saveGalleryWebp(containerPath, image, size, fileName) {
	return new Promise((resolve, reject) => {
		sharp(image)
			.webp({})
			.resize(getWidth(size))
			.toBuffer()
			.then((data) => {
				s3.upload(
					{
						Bucket: 'land-of-hop-images',
						Key: `${containerPath}/container/webp/${getSize(size)}/${fileName}.webp`,
						Body: data,
						CacheControl: 'max-age=31536000',
						ACL: 'public-read'
					},
					(errors, data) => {
						if (errors) {
							reject(errors);
						} else {
							resolve(data);
						}
					}
				);
			});
	});
}
