/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { writable } from 'svelte/store';
import type { FieldTypes, StoreFormDataTypes } from '$lib/utils/types/form';

export function makeFormStore(fieldsArr: FieldTypes[]) {
	const fields = formatData(fieldsArr);

	function formatData(fields: FieldTypes[]): StoreFormDataTypes {
		return fields.reduce(
			(
				acc,
				{
					hasInvertedColors,
					isRequired,
					isTouched,
					isValid,
					label,
					name,
					type,
					validateWith,
					value
				}
			) => ({
				...acc,
				[name]: {
					...(hasInvertedColors && { hasInvertedColors }),
					id: `login-${name}`,
					...(isRequired && { isRequired }),
					isTouched: isTouched ?? false,
					isValid: isValid ?? false,
					label,
					...(type && { type }),
					validateWith: validateWith ?? [],
					value: value ?? ''
				}
			}),
			{}
		);
	}

	const { subscribe, update, set } = writable(fields);

	function validate({ isRequired, validateWith, value }) {
		if (validateWith.length) {
			return validateWith.every(({ regex }) => !!value.match(regex));
		}

		if (isRequired) {
			return value.length > 0;
		}

		return true;
	}

	function onBlur(e) {
		const fieldName = e.target.dataset.name;
		const { isRequired, validateWith, value } = fields[fieldName];

		update((fields) => {
			fields[fieldName].isTouched = true;
			fields[fieldName].isValid = validate({ isRequired, validateWith, value });
			return fields;
		});
	}

	return {
		onBlur,
		set,
		subscribe
	};
}
