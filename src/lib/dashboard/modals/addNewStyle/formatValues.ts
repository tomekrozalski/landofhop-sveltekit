import type { Style } from '$lib/utils/types/Style';
import { formatLanguageValueArray } from '$lib/dashboard/utils/dataNormalizers';

type Input = {
	badge: string;
	name: {
		value: string;
		language: string;
	}[];
};

export default function formatValues({ badge, name }: Input): Style {
	return {
		badge: badge.trim(),
		name: formatLanguageValueArray(name)
	};
}
