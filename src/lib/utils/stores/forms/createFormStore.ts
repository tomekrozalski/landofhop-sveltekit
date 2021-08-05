import { writable } from 'svelte/store';
import type {
	ErrorReasons,
	FieldTypes,
	StoreFieldListDataTypes,
	StoreFormDataTypes,
	ValidationData
} from '$lib/utils/types/form';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function createFormStore(
	fieldsArr: FieldTypes[],
	formName: string,
	translate: (value: string, options?: unknown) => string
) {
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
					errorMessage: translate('form.validation.email')
				});
			}

			if (reason === 'isValidPassword') {
				newArray.push({
					regex: /.{8,}/,
					errorMessage: translate('form.validation.minLength', { value: 8 })
				});

				newArray.push({
					regex: /.*\d.*/,
					errorMessage: translate('form.validation.atLeastOneDigit')
				});

				newArray.push({
					regex: /.*[@$!%*#?&].*/,
					errorMessage: translate('form.validation.atLeastOneSpecialCharacter')
				});

				newArray.push({
					regex: /.*[A-Z].*/,
					errorMessage: translate('form.validation.atLeastOneCapitalLetter')
				});

				newArray.push({
					regex: /.*[a-z].*/,
					errorMessage: translate('form.validation.atLeastOneSmallLetter')
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
			return translate('form.validation.required');
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
