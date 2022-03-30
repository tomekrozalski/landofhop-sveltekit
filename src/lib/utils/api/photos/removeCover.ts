import aws from 'aws-sdk';

const s3 = new aws.S3({});

export default function removeCover(path) {
	return new Promise((resolve, reject) => {
		try {
			const paths = [
				{ Key: `${path}/cover/jpg/4x.jpg` },
				{ Key: `${path}/cover/jpg/2x.jpg` },
				{ Key: `${path}/cover/jpg/1x.jpg` },
				{ Key: `${path}/cover/webp/4x.webp` },
				{ Key: `${path}/cover/webp/2x.webp` },
				{ Key: `${path}/cover/webp/1x.webp` },
				{ Key: `${path}/cover/jpg` },
				{ Key: `${path}/cover/webp` },
				{ Key: `${path}/cover` }
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
					resolve('Cover image and cover folder was removed');
				}
			});
		} catch (err) {
			reject(err);
		}
	});
}
