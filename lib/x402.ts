import { ethers } from 'ethers';

const USDT_XLAYER = '0x1E4a5963aBFD975d8c9021ce480b42188849D41d';
const VAULT_ADDRESS = process.env.NEXT_PUBLIC_VAULT_ADDRESS || '0x0000000000000000000000000000000000000000';

export async function buildX402PaymentHeader(
  walletAddress: string,
  amountUsdt: string
): Promise<string> {
  // Use the OKX Wallet provider injected into the window
  const provider = new ethers.BrowserProvider((window as any).okxwallet || (window as any).ethereum);
  const signer = await provider.getSigner();

  const value = ethers.parseUnits(amountUsdt, 6);
  const validAfter = 0;
  const validBefore = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
  const nonce = ethers.hexlify(ethers.randomBytes(32));

  // EIP-712 typed signature (EIP-3009 TransferWithAuthorization)
  const signature = await signer.signTypedData(
    { name: 'USD Coin', version: '2', chainId: 196, verifyingContract: USDT_XLAYER },
    {
      TransferWithAuthorization: [
        { name: 'from',        type: 'address' },
        { name: 'to',          type: 'address' },
        { name: 'value',       type: 'uint256' },
        { name: 'validAfter',  type: 'uint256' },
        { name: 'validBefore', type: 'uint256' },
        { name: 'nonce',       type: 'bytes32' },
      ],
    },
    { from: walletAddress, to: VAULT_ADDRESS, value, validAfter, validBefore, nonce }
  );

  return JSON.stringify({ 
    from: walletAddress, 
    to: VAULT_ADDRESS, 
    value: value.toString(), 
    validAfter, 
    validBefore, 
    nonce, 
    signature 
  });
}
