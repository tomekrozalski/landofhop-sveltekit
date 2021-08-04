import { Currency } from 'utils/enums/Beverage';

export type Price = {
  date: Date;
  value: number;
  currency: Currency;
};
