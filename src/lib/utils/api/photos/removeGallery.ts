import aws from 'aws-sdk';

const s3 = new aws.S3({});

export default function removeGallery(path, files) {
	return new Promise((resolve, reject) => {
		try {
			const paths = [];

			Array(files)
				.fill('')
				.forEach((_, i) => {
					const properIndex = i + 1;
					const fileName = properIndex < 10 ? `0${properIndex}` : properIndex;

					paths.push(
						{ Key: `${path}/container/jpg/4x/${fileName}.jpg` },
						{ Key: `${path}/container/jpg/2x/${fileName}.jpg` },
						{ Key: `${path}/container/jpg/1x/${fileName}.jpg` },
						{ Key: `${path}/container/webp/4x/${fileName}.webp` },
						{ Key: `${path}/container/webp/2x/${fileName}.webp` },
						{ Key: `${path}/container/webp/1x/${fileName}.webp` }
					);

					if (properIndex === files) {
						paths.push(
							{ Key: `${path}/container/jpg/4x` },
							{ Key: `${path}/container/jpg/2x` },
							{ Key: `${path}/container/jpg/1x` },
							{ Key: `${path}/container/webp/4x` },
							{ Key: `${path}/container/webp/2x` },
							{ Key: `${path}/container/webp/1x` },
							{ Key: `${path}/container/jpg` },
							{ Key: `${path}/container/webp` },
							{ Key: `${path}/container` }
						);
					}
				});

			const params = {
				Bucket: 'land-of-hop-images',
				Delete: {
					Objects: paths,
					Quiet: true
				}
			};

			s3.deleteObjects(params, (err) => {
				if (err) {
					reject('S3 deleting failed');
				} else {
					resolve('Gallery images removed');
				}
			});
		} catch (err) {
			reject(err);
		}
	});
}
