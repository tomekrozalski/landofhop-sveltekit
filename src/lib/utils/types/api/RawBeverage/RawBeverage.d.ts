import type { RawEditorial } from './RawEditorial';
import type { RawLabel } from './RawLabel';
import type { RawProducer } from './RawProducer';

export type RawBeverage = {
	_id: string;
	shortId: string;
	badge: string;
	label: RawLabel;
	producer?: RawProducer;
	editorial?: RawEditorial;
	added: Date;
	updated?: Date;
};
