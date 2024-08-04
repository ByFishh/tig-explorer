import { IAverageRewards } from '@/types/IAverageRewards/IAverageRewards';
import { IBaseNode } from '@/types/IBaseNode/IBaseNode';
import { ITotalEarned } from '@/types/ITotalEarned/ITotalEarned';
import axios from 'axios';
import { Address, createPublicClient, formatEther, http, parseAbi } from 'viem';
import { base } from 'viem/chains';

const baseApiUrl = 'https://api.tig-explorer.com';
const contractAddress = '0x0c03ce270b4826ec62e7dd007f0b716068639f7b';
const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export const getBaseNode = async (address: string) => {
  const response = await axios.get<{ node: IBaseNode }>(
    `${baseApiUrl}/nodes/${address}`,
  );

  return response.data.node;
};

export const getBalance = async (address: string) => {
  return Number(
    formatEther(
      await publicClient.readContract({
        address: contractAddress,
        abi: parseAbi([
          'function balanceOf(address) public view returns (uint256)',
        ]),
        functionName: 'balanceOf',
        args: [address as Address],
      }),
    ),
  );
};

export const getNodePreview = async (address: string) => {
  try {
    const res = await axios.get<
      | string
      | {
          node: {
            total_earned: ITotalEarned;
            average_rewards: IAverageRewards;
          };
        }
    >(`${baseApiUrl}/nodes/${address}/preview`);
    if (typeof res.data === 'string') throw 'Unable to fetch data';
    return res.data.node;
  } catch (error) {
    return address;
  }
};
