import { MongoClient } from 'mongodb';
import { MONGODB_URL } from '$env/static/private';
import type { RawBasics } from '$types/RawBasics';
import type { RawBeverage } from '$types/RawBeverage';
import type { RawIngredient } from '$types/RawIngredient';
import type { RawInstitution } from '$types/RawInstitution';
import type { RawPlace } from '$types/RawPlace';
import type { RawStyle } from '$types/RawStyle';

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
export const styles = db.collection<RawStyle>('styles');
export const users = db.collection('users');
