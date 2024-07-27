import { Injectable } from '@nestjs/common';
import { GetBlockResponse, GetPlayersResponse } from '../types/tig';
import axios from 'axios';

@Injectable()
export class TigService {
  constructor() {}

  async getBlock(round?: number): Promise<GetBlockResponse> {
    const response = await axios.get<GetBlockResponse>(
      'https://mainnet-api.tig.foundation/get-block',
      {
        params: {
          round,
        },
      },
    );
    return response.data;
  }

  async getPlayers(
    playerType: 'benchmarker' | 'innovator',
    blockId: string,
  ): Promise<GetPlayersResponse> {
    try {
      const response = await axios.get<GetPlayersResponse>(
        'https://mainnet-api.tig.foundation/get-players',
        {
          params: {
            player_type: playerType,
            block_id: blockId,
          },
        },
      );
      return response.data;
    } catch (e) {
      console.log(e, blockId);
      return { players: [] } as GetPlayersResponse;
    }
  }
}
