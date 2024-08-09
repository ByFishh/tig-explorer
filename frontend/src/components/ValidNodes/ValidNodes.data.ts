import { IUnit } from '@/types/IUnit/IUnit';

export const validNodesHeaders: { txt: string; unit?: IUnit }[] = [
  {
    txt: 'Address',
  },
  {
    txt: 'Total earned',
    unit: IUnit.TIG,
  },
  {
    txt: 'Average earned',
    unit: IUnit.TIG_PER_HOUR,
  },
  {
    txt: 'Cost per TIG',
    unit: IUnit.DOLLARD,
  },
  {
    txt: 'Server cost',
    unit: IUnit.DOLLARD_PER_MONTH,
  },
  {
    txt: 'Core number',
  },
  {
    txt: 'Start date',
  },
  {
    txt: 'Notes',
  },
  {
    txt: '',
  },
];
