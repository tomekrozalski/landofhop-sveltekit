import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI as string;

const options: MongoClientOptions = {};

let client;
let clientPromise;

if (!uri) {
	throw new Error('Please add your Mongo URI to .env');
}

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}

	clientPromise = global._mongoClientPromise;
} else {
	// In production mode, it's best to
	// not use a global variable.
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise.
// By doing this in a separate module,
// the client can be shared across functions.
export default clientPromise;
