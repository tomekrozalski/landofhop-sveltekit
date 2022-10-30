import type { LabelFormOutput } from '$Beverage/Label/LabelFormValues.d';
import type { ProducerFormOutput } from '$Beverage/Producer/ProducerFormValues.d';
import type { EditorialFormOutput } from '$Beverage/Editorial/EditorialFormValues.d';

export type NewBeverageRequest = {
	label: LabelFormOutput;
	producer?: ProducerFormOutput;
	editorial?: EditorialFormOutput;
};

export type CommonProps = {
	badge: string;
	shortId: string;
	added: Date;
};
