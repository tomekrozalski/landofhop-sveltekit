export type FieldTypes = {
	hasInvertedColors?: boolean;
	isRequired?: boolean;
	isTouched?: boolean;
	isValid?: boolean;
	label: string;
	name: string;
	type?: 'text' | 'email' | 'password';
	validateWith?: {
		regex: RegExp;
		errorMessage: string;
	}[];
	value?: string;
};

type StoreFieldDataTypes = {
	hasInvertedColors?: boolean;
	isRequired?: boolean;
	isTouched: boolean;
	isValid: boolean;
	label: string;
	type?: 'text' | 'email' | 'password';
	validateWith: {
		regex: RegExp;
		errorMessage: string;
	}[];
	value: string;
};

export type StoreFormDataTypes = {
	[string]: StoreFieldTypes;
};
