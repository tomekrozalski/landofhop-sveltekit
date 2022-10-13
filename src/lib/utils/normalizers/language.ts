import type { LanguageValue } from '$types/LanguageValue.d';

function formatLanguageValueArray(
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

export default formatLanguageValueArray;
