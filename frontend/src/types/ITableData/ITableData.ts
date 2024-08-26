import { IAverageRewards } from '../IAverageRewards/IAverageRewards';
import { IBenchmarkerInputs } from '../IBenchmarkerInputs/IBenchmarkerInputs';
import { ITotalEarned } from '../ITotalEarned/ITotalEarned';

export type ITableData = IBenchmarkerInputs & {
  total_earned: ITotalEarned;
  average_rewards: IAverageRewards;
  invalid: boolean;
};
