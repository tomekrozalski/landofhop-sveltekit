import {
  AgedPreviousContent,
  AgedTimeUnit,
  AgedType,
  AgedWood,
} from 'utils/enums/Beverage';

export type Aged = {
  type?: AgedType;
  wood?: AgedWood;
  time?: {
    value: number;
    unit: AgedTimeUnit;
  };
  previousContent?: AgedPreviousContent[];
};
