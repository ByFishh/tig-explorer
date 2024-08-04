import { IAverageRewards } from '../IAverageRewards/IAverageRewards';
import { INodeInputs } from '../INodeInputs/INodeInputs';
import { ITotalEarned } from '../ITotalEarned/ITotalEarned';

export type ITableData = INodeInputs & {
  total_earned: ITotalEarned;
  average_rewards: IAverageRewards;
};
