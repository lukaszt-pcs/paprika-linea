import { useState } from 'react';
import { VeraxSdk } from '@verax-attestation-registry/verax-sdk';
import { useWallet } from '../../providers/WalletProvider';

interface PortalManagerProps {
  onPortalCreated: (portalId: string) => void;
}

export function PortalManager({ onPortalCreated }: PortalManagerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { provider, address, connect } = useWallet();

  const handleCreatePortal = async () => {
    if (!provider) {
      setError('Please connect your wallet first');
      return;
    }

    setIsCreating(true);
    setError(null);
    
    try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress() as `0x${string}`;
      const veraxSdk = new VeraxSdk(VeraxSdk.DEFAULT_LINEA_MAINNET_FRONTEND, address);
      
      const txHash = await veraxSdk.portal.deployDefaultPortal(
        [], // No modules needed
        "Paprika Time Logger Portal",
        "Portal for logging employee working hours",
        true, // Make attestations revocable
        "Paprika Studio"
      );

      // Get portal ID from transaction receipt
      const receipt = await provider.getTransactionReceipt(txHash.transactionHash || '');
      if (receipt && receipt.logs[0]) {
        onPortalCreated(receipt.logs[0].address);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create portal');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">Portal Management</h2>
      {!provider ? (
        <button
          onClick={connect}
          className="bg-paprika-red hover:bg-paprika-red-dark text-white px-4 py-2 rounded-lg"
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <p className="text-sm text-gray-600 mb-2">Connected: {address}</p>
          <button
            onClick={handleCreatePortal}
            disabled={isCreating}
            className="bg-paprika-red hover:bg-paprika-red-dark text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {isCreating ? 'Creating Portal...' : 'Create New Portal'}
          </button>
        </div>
      )}
      {error && (
        <p className="mt-2 text-red-500">{error}</p>
      )}
    </div>
  );
} 