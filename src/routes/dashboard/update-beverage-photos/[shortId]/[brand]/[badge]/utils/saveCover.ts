import aws from 'aws-sdk';
import sharp from 'sharp';
import { getSize, getWidth } from './getSize';

const s3 = new aws.S3({});

export function saveCoverJpg(coverPath, image, size) {
	return new Promise((resolve, reject) => {
		sharp(image)
			.jpeg({})
			.resize(getWidth(size))
			.toBuffer()
			.then((data) => {
				return s3.upload(
					{
						Bucket: 'land-of-hop-images',
						Key: `${coverPath}/cover/jpg/${getSize(size)}.jpg`,
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

export function saveCoverWebp(coverPath, image, size) {
	return new Promise((resolve, reject) => {
		sharp(image)
			.webp({})
			.resize(getWidth(size))
			.toBuffer()
			.then((data) => {
				s3.upload(
					{
						Bucket: 'land-of-hop-images',
						Key: `${coverPath}/cover/webp/${getSize(size)}.webp`,
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
