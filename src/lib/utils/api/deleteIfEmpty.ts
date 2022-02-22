import lodash from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deleteIfEmpty(fields: string[], object: any) {
	return fields.forEach((field) => {
		if (lodash.isEmpty(lodash.get(object, field))) {
			lodash.unset(object, field);
		}
	});
}

export default deleteIfEmpty;
