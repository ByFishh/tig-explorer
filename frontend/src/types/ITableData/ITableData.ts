import { IAverageRewards, ITotalEarned } from '../INode/INode';
import { INodeInputs } from '../INodeInputs/INodeInputs';

export type ITableData = INodeInputs & {
  total_earned: ITotalEarned;
  average_rewards: IAverageRewards;
};
