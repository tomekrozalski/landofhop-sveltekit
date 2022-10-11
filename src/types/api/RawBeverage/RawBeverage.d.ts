import type { RawEditorial } from './RawEditorial';
import type { RawLabel } from './RawLabel';
import type { RawProducer } from './RawProducer';

export type RawBeverageWithoutId = {
	shortId: string;
	badge: string;
	label: RawLabel;
	producer?: RawProducer;
	editorial?: RawEditorial;
	added: Date;
	updated?: Date;
};

export type RawBeverage = RawBeverageWithoutId & {
	_id: string;
};
