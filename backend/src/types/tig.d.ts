export type Block = {
  config: {
    algorithm_submissions: {
      adoption_threshold: number;
      merge_points_threshold: number;
      push_delay: number;
      submission_fee: string;
    };
    benchmark_submissions: {
      lifespan_period: number;
      max_samples: number;
      min_num_solutions: number;
      submission_delay_multiplier: number;
    };
    difficulty: {
      max_scaling_factor: number;
      min_frontiers_gaps: null;
      parameters: {
        c001: {
          name: string;
          min_value: number;
          max_value: number;
        }[];
        c002: {
          name: string;
          min_value: number;
          max_value: number;
        }[];
        c003: {
          name: string;
          min_value: number;
          max_value: number;
        }[];
        c004: {
          name: string;
          min_value: number;
          max_value: number;
        }[];
      };
    };
    erc20: {
      burn_address: string;
      chain_id: string;
      rpc_url: string;
      token_address: string;
    };
    optimisable_proof_of_work: {
      enable_proof_of_deposit: null;
      imbalance_multiplier: number;
      rolling_deposit_decay: null;
    };
    qualifiers: {
      cutoff_multiplier: number;
      total_qualifiers_threshold: number;
    };
    rewards: {
      distribution: {
        benchmarkers: number;
        breakthroughs: number;
        optimisations: number;
      };
      schedule: { block_reward: number; round_start: number }[];
    };
    rounds: {
      blocks_per_round: number;
    };
    solution_signature: {
      equilibrium_rate_multiplier: number;
      max_percent_delta: number;
      percent_error_multiplier: number;
      threshold_decay: null;
    };
    wasm_vm: {
      max_fuel: number;
      max_memory: number;
    };
  };
  data: null;
  details: {
    eth_block_num: null;
    height: number;
    prev_block_id: string;
    round: number;
  };
  id: string;
};

export type GetBlockResponse = {
  block: Block;
};

export type BlockDetails = {
  eth_block_num: number;
  height: number;
  prev_block_id: string;
  round: number;
};

export type BlockId = string;

export type Player = {
  id: string;
  details: {
    name: string;
    is_multisig: boolean;
  };
  block_data: {
    num_qualifiers_by_challenge: {
      c001?: number;
      c002?: number;
      c003?: number;
      c004?: number;
    };
    cutoff: number;
    deposit: string;
    rolling_deposit: string;
    imbalance: string;
    imbalance_penalty: string;
    influence: string;
    reward: string;
    round_earnings: string;
  };
};

export type GetPlayersResponse = {
  block_details: BlockDetails;
  block_id: BlockId;
  players: Player[];
};
