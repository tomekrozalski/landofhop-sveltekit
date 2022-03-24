import { LabelFormOutput } from '$lib/dashboard/beverage/label/LabelFormValues';
import { ProducerFormOutput } from '$lib/dashboard/beverage/producer/ProducerFormValues';
import { EditorialFormOutput } from '$lib/dashboard/beverage/editorial/EditorialFormValues';

export type NewBeverageRequest = {
	label: LabelFormOutput;
	producer?: ProducerFormOutput;
	editorial?: EditorialFormOutput;
};
