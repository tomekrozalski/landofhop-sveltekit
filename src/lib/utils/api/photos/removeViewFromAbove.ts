import aws from 'aws-sdk';

const s3 = new aws.S3({});

export default function removeViewFromAbove(path) {
	return new Promise((resolve, reject) => {
		try {
			const paths = [
				{ Key: `${path}/view-from-above/jpg/4x.jpg` },
				{ Key: `${path}/view-from-above/jpg/2x.jpg` },
				{ Key: `${path}/view-from-above/jpg/1x.jpg` },
				{ Key: `${path}/view-from-above/webp/4x.webp` },
				{ Key: `${path}/view-from-above/webp/2x.webp` },
				{ Key: `${path}/view-from-above/webp/1x.webp` },
				{ Key: `${path}/view-from-above/jpg` },
				{ Key: `${path}/view-from-above/webp` },
				{ Key: `${path}/view-from-above` }
			];

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
					resolve('View from above images were removed');
				}
			});
		} catch (err) {
			reject(err);
		}
	});
}
