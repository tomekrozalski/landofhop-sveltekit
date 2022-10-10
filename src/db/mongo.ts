import { MongoClient } from 'mongodb';
import { MONGODB_URL } from '$env/static/private';
import type { RawBasics } from '$lib/utils/types/api/RawBasics';
import type { RawBeverage } from '$lib/utils/types/api/RawBeverage/RawBeverage';
import type { RawIngredient } from '$lib/utils/types/api/RawIngredient';
import type { RawInstitution } from '$lib/utils/types/api/RawInstitution';
import type { RawPlace } from '$lib/utils/types/api/RawPlace';
import type { RawStyles } from '$lib/utils/types/api/RawStyles';

const client = new MongoClient(MONGODB_URL);

export function start_mongo(): Promise<MongoClient> {
	console.log('Starting mongo…');
	return client.connect();
}

const db = client.db('landofhop');

export const basics = db.collection<RawBasics>('basics');
export const beverages = db.collection<RawBeverage>('beverages');
export const ingredients = db.collection<RawIngredient>('ingredients');
export const institutions = db.collection<RawInstitution>('institutions');
export const places = db.collection<RawPlace>('places');
export const sessions = db.collection('sessions');
export const styles = db.collection<RawStyles>('styles');
export const users = db.collection('users');
