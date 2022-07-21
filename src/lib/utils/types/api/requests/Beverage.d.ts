import { LabelFormOutput } from '$lib/dashboard/Beverage/Label/LabelFormValues';
import { ProducerFormOutput } from '$lib/dashboard/Beverage/Producer/ProducerFormValues';
import { EditorialFormOutput } from '$lib/dashboard/Beverage/Editorial/EditorialFormValues';

export type NewBeverageRequest = {
	label: LabelFormOutput;
	producer?: ProducerFormOutput;
	editorial?: EditorialFormOutput;
};
