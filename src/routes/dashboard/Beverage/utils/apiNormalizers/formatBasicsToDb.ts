import type { RawBasics } from '$types/RawBasics.d';
import type { CommonProps, NewBeverageRequest } from './ApiTypes.d';

export const formatBasicsToDb = (
	{ label }: NewBeverageRequest,
	commonProps: CommonProps,
	coverImage?: RawBasicsCoverImage // @ToDo unknown types
): RawBasics => ({
	brand: {
		badge: label.brand.badge,
		name: label.brand.name
	},
	name: label.name,
	...(coverImage && { coverImage }),
	containerType: label.container.type,
	...commonProps
});
