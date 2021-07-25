export type ErrorReasons = 'isValidPassword' | 'isValidEmail';

export type FieldTypes = {
	hasInvertedColors?: boolean;
	isRequired?: boolean;
	isTouched?: boolean;
	isValid?: boolean;
	label: string;
	name: string;
	type?: string;
	validateWith?: ErrorReasons[];
	value?: string;
};

export type ValidationData = {
	regex: RegExp;
	errorMessage: string;
};

type StoreFieldDataTypes = {
	hasInvertedColors?: boolean;
	isRequired?: boolean;
	isTouched: boolean;
	isValid: boolean;
	label: string;
	type?: string;
	validateWith: ErrorDataReasons[];
	value: string;
};

export type StoreFieldListDataTypes = {
	[string]: StoreFieldDataTypes;
};

export type StoreFormDataTypes = {
	summary: {
		name: string;
		isValid: boolean;
	};
	fields: StoreFieldListDataTypes;
};
