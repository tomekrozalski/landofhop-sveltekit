export type InputTypeTypes = 'text' | 'email' | 'password';

export type FieldTypes = {
	hasInvertedColors?: boolean;
	isRequired?: boolean;
	isTouched: boolean;
	isValid: boolean;
	label: string;
	name: string;
	type?: InputTypeTypes;
	validateWith?: RegExp;
	value: string;
};

export type FormTypes = {
	name: string;
	fields: FieldTypes[];
};
