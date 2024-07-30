import { ChartData } from 'chart.js';
import { IChartType } from '../IChartType.ts/IChartType';

export type IChartContainer = {
  title: string;
  description: string;
  type: IChartType;
  data:
    | ChartData<'line', number[], string>
    | ChartData<'bar', number[], string>;
};
