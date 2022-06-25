import type { NewBeverageRequest } from '$lib/utils/types/api/requests/Beverage';
import type {
	RawCommonBasicsBeverage,
	RawBasicsCoverImage,
	RawBasicsWithoutId
} from '$lib/utils/types/api/RawBasics.d';

function formatBasics(
	{ label }: NewBeverageRequest,
	commonProps: RawCommonBasicsBeverage,
	coverImage?: RawBasicsCoverImage
): RawBasicsWithoutId {
	return {
		brand: label.brand,
		name: label.name,
		...(coverImage && { coverImage }),
		containerType: label.container.type,
		...commonProps
	};
}

export default formatBasics;
