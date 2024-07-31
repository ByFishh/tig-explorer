import axios from 'axios';
import { IBaseNode } from '@/types/INode/INode';
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
