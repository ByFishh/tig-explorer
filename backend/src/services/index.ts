import { BlockRewardsService } from './block-rewards.service';
import { NodesService } from './nodes.service';
import { RoundRewardsService } from './round-rewards.service';
import { TigService } from './tig.service';

export { TigService, RoundRewardsService, BlockRewardsService, NodesService };

export default [
  TigService,
  RoundRewardsService,
  BlockRewardsService,
  NodesService,
];
