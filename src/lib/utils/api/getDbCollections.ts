import { MongoClient } from 'mongodb';
import { mode } from '$app/env';

import type { RawBasics } from '$lib/utils/types/api/RawBasics';
import type { RawBeverage } from '$lib/utils/types/api/RawBeverage/RawBeverage';
import type { RawIngredient } from '$lib/utils/types/api/RawIngredient';
import type { RawInstitution } from '$lib/utils/types/api/RawInstitution';
import type { RawPlace } from '$lib/utils/types/api/RawPlace';
import type { RawStyles } from '$lib/utils/types/api/RawStyles';

const uri = import.meta.env.VITE_MONGODB_URI as string;

if (!uri) {
	throw new Error('Please add your Mongo URI to .env');
}

function getDbConnection() {
	let client;
	let clientPromise;

	if (mode === 'development') {
		if (!globalThis._mongoClientPromise) {
			client = new MongoClient(uri);
			globalThis._mongoClientPromise = client.connect();
		}

		clientPromise = globalThis._mongoClientPromise;
	} else if (mode === 'production') {
		client = new MongoClient(uri);
		clientPromise = client.connect();
	}

	return clientPromise;
}

async function getDb() {
	const dbConnection = (await getDbConnection()) as MongoClient;
	const db = dbConnection.db('landofhop');

	return {
		basics: db.collection<RawBasics>('basics'),
		beverages: db.collection<RawBeverage>('beverages'),
		ingredients: db.collection<RawIngredient>('ingredients'),
		institutions: db.collection<RawInstitution>('institutions'),
		places: db.collection<RawPlace>('places'),
		sessions: db.collection('sessions'),
		styles: db.collection<RawStyles>('styles'),
		users: db.collection('users')
	};
}

export default getDb;
