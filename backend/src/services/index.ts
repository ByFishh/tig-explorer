import { BlockRewardsService } from './block-rewards/block-rewards.service';
import { BenchmarkersService } from './benchmarkers/benchmarkers.service';
import { RoundRewardsService } from './round-rewards/round-rewards.service';
import { TigService } from './tig/tig.service';

export {
  BlockRewardsService,
  BenchmarkersService,
  RoundRewardsService,
  TigService,
};

export default [
  BlockRewardsService,
  BenchmarkersService,
  RoundRewardsService,
  TigService,
];
