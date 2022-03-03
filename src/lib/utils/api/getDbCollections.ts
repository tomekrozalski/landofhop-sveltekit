import type { RawBasics } from '$lib/utils/types/api/RawBasics';
import type { RawBeverage } from '$lib/utils/types/api/RawBeverage/RawBeverage';
import type { RawIngredient } from '$lib/utils/types/api/RawIngredient';
import type { RawInstitution } from '$lib/utils/types/api/RawInstitution';
import type { RawPlace } from '$lib/utils/types/api/RawPlace';
import type { RawStyles } from '$lib/utils/types/api/RawStyles';

import getDbConnection from './getDbConnection';

async function getDb() {
	const dbConnection = await getDbConnection;
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
