import clientPromise from '$lib/utils/db';

export async function get(request) {
	const dbConnection = await clientPromise;
	const db = dbConnection.db('landofhop');
	const collection = db.collection('basics');
	const basics = await collection.count();

	return {
		status: 200,
		body: {
			basics
		}
	};
}
