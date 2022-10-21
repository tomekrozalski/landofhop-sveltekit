import type { LanguageValue } from '$types/LanguageValue.d';

export function formatLanguageValueFromDb(arr: LanguageValue[]): {
	language: string;
	value: string;
}[] {
	return arr.map(({ language, value }) => ({
		language: language ?? '--',
		value: value.trim()
	}));
}

export function formatLanguageValueToDb(
	arr: {
		language: string;
		value: string;
	}[]
): LanguageValue[] {
	return arr.map(({ language, value }) => ({
		...(language !== '--' && { language }),
		value: value.trim()
	}));
}
