import { MongoClient } from 'mongodb';
import type { RawBasics } from '$lib/utils/types/api/RawBasics';
import type { RawBeverage } from '$lib/utils/types/api/RawBeverage/RawBeverage';

const uri = import.meta.env.VITE_MONGODB_URI as string;

if (!uri) {
	throw new Error('Please add your Mongo URI to .env');
}

async function getDb() {
	const client = new MongoClient(uri);
	const dbConnection = await client.connect();
	const db = dbConnection.db('landofhop');

	return {
		basics: db.collection<RawBasics>('basics'),
		beverages: db.collection<RawBeverage>('beverages'),
		ingredients: db.collection('ingredients'),
		institutions: db.collection('institutions'),
		places: db.collection('places'),
		sessions: db.collection('sessions'),
		styles: db.collection('styles'),
		users: db.collection('users')
	};
}

export default getDb;
