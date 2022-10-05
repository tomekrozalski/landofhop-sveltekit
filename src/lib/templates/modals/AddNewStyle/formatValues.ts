import type { Style } from '$lib/utils/types/Style';
import { formatLanguageValueArray } from '$lib/utils/helpers/dataNormalizers';

type Input = {
	badge: string;
	name: {
		value: string;
		language: string;
	}[];
	group: string;
};

export default function formatValues({ badge, name, group }: Input): Style {
	return {
		badge: badge.trim(),
		name: formatLanguageValueArray(name),
		group
	};
}
