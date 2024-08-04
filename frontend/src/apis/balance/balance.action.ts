import { Address, createPublicClient, formatEther, http, parseAbi } from 'viem';
import { base } from 'viem/chains';

const contractAddress = '0x0c03ce270b4826ec62e7dd007f0b716068639f7b';
const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

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
