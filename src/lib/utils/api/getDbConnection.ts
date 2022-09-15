import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI as string;

if (!uri) {
	throw new Error('Please add your Mongo URI to .env');
}

let client = null;
let clientPromise = null;

if (process.env.NODE_ENV !== 'production') {
	if (!globalThis._mongoClientPromise) {
		client = new MongoClient(uri);
		globalThis._mongoClientPromise = client.connect();
	}

	clientPromise = globalThis._mongoClientPromise;
} else if (process.env.NODE_ENV === 'production' && client === null && clientPromise === null) {
	client = new MongoClient(uri);
	clientPromise = client.connect();
}

export default clientPromise as Promise<MongoClient>;
