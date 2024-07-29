import { IUnit } from '../IUnit/IUnit';

export type ICardData = {
  title: string;
  value: number;
  unit: IUnit;
  percentage?: number;
};
