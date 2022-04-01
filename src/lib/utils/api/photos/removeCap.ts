import aws from 'aws-sdk';

const s3 = new aws.S3({});

export default function removeCap(path) {
	return new Promise((resolve, reject) => {
		try {
			const paths = [
				{ Key: `${path}/cap/jpg/4x.jpg` },
				{ Key: `${path}/cap/jpg/2x.jpg` },
				{ Key: `${path}/cap/jpg/1x.jpg` },
				{ Key: `${path}/cap/webp/4x.webp` },
				{ Key: `${path}/cap/webp/2x.webp` },
				{ Key: `${path}/cap/webp/1x.webp` },
				{ Key: `${path}/cap/jpg` },
				{ Key: `${path}/cap/webp` },
				{ Key: `${path}/cap` }
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
					resolve('Cap image and cap folder was removed');
				}
			});
		} catch (err) {
			reject(err);
		}
	});
}
