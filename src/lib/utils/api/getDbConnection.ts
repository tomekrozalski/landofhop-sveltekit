import { MongoClient } from 'mongodb';
import { mode } from '$app/env';

const uri = import.meta.env.VITE_MONGODB_URI as string;

if (!uri) {
	throw new Error('Please add your Mongo URI to .env');
}

let client = null;
let clientPromise = null;

if (mode === 'development') {
	if (!globalThis._mongoClientPromise) {
		client = new MongoClient(uri);
		globalThis._mongoClientPromise = client.connect();
	}

	clientPromise = globalThis._mongoClientPromise;
} else if (mode === 'production' && client === null && clientPromise === null) {
	client = new MongoClient(uri);
	clientPromise = client.connect();
}

export default clientPromise as Promise<MongoClient>;
