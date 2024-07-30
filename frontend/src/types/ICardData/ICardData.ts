import { IUnit } from '../IUnit/IUnit';

export type ICardData = {
  title: string;
  value: number | undefined;
  unit: IUnit;
  percentage?: number;
};
