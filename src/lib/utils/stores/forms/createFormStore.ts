import { writable } from 'svelte/store';
import type {
	ErrorReasons,
	FieldTypes,
	StoreFieldListDataTypes,
	StoreFormDataTypes,
	ValidationData
} from '$lib/utils/types/form';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createFormStore(fieldsArr: FieldTypes[], formName: string) {
	const store: StoreFormDataTypes = {
		summary: {
			name: formName,
			isValid: false
		},
		fields: formatData(fieldsArr)
	};

	function createValidationDetails(validateWith: ErrorReasons[]): ValidationData[] {
		return validateWith.reduce((acc, reason) => {
			const newArray = [...acc];

			if (reason === 'isValidEmail') {
				newArray.push({
					regex: emailRegex,
					errorMessage: 'The field should be valid e-mail address'
				});
			}

			if (reason === 'isValidPassword') {
				newArray.push({
					regex: /.{8,}/,
					errorMessage: 'At least eight characters long is required'
				});

				newArray.push({
					regex: /.*\d.*/,
					errorMessage: 'At least one number is required'
				});

				newArray.push({
					regex: /.*[@$!%*#?&].*/,
					errorMessage: 'At least one special character is required'
				});

				newArray.push({
					regex: /.*[A-Z].*/,
					errorMessage: 'At least one uppercase letter is required'
				});

				newArray.push({
					regex: /.*[a-z].*/,
					errorMessage: 'At least one lowercase letter is required'
				});
			}

			return newArray;
		}, []);
	}

	function formatData(fields: FieldTypes[]): StoreFieldListDataTypes {
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
					errorMessage: null,
					...(hasInvertedColors && { hasInvertedColors }),
					id: `${formName}-${name}`,
					...(isRequired && { isRequired }),
					isTouched: isTouched ?? false,
					isValid: isValid ?? false,
					label,
					...(type && { type }),
					validateWith: validateWith ? createValidationDetails(validateWith) : [],
					value: value ?? ''
				}
			}),
			{}
		);
	}

	const { subscribe, update, set } = writable(store);

	function checkIsFieldValid({ isRequired, validateWith, value }) {
		if (validateWith.length) {
			return validateWith.every(({ regex }) => !!value.match(regex));
		}

		if (isRequired) {
			return value.length > 0;
		}

		return true;
	}

	function getErrorMessage({ isRequired, validateWith, value }) {
		if (isRequired && !value.length) {
			return 'Field is required';
		}

		if (validateWith.length) {
			const errorMessage = validateWith.find(({ regex }) => !value.match(regex))?.errorMessage;

			if (errorMessage) {
				return errorMessage;
			}
		}

		return null;
	}

	function checkIsFormValid() {
		return Object.values(store.fields).every(({ isValid }) => isValid);
	}

	function onBlur(e) {
		const fieldName = e.target.dataset.name;
		const { isRequired, validateWith, value } = store.fields[fieldName];

		update((store) => {
			store.fields[fieldName].isTouched = true;
			store.fields[fieldName].isValid = checkIsFieldValid({ isRequired, validateWith, value });
			store.fields[fieldName].errorMessage = getErrorMessage({ isRequired, validateWith, value });
			store.summary.isValid = checkIsFormValid();
			return store;
		});
	}

	return {
		onBlur,
		set,
		subscribe
	};
}
