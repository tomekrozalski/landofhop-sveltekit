import formatLanguageValueArray from '$lib/utils/normalizers/language';
import type { Input, Output } from './types.d';

export default function formatValues({ badge, name, occurrences, parent, type }: Input): Output {
	return {
		badge: badge.trim(),
		name: formatLanguageValueArray(name),
		occurrences,
		parent,
		type
	};
}
