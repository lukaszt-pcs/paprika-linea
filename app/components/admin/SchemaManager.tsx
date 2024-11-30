import { useState, useEffect } from 'react';
import { VeraxSdk } from '@verax-attestation-registry/verax-sdk';
import { useWallet } from '../../providers/WalletProvider';
import { type Address } from 'viem';

interface SchemaManagerProps {
  onSchemaCreated: (schemaId: string) => void;
}

export function SchemaManager({ onSchemaCreated }: SchemaManagerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schemaId, setSchemaId] = useState<string>('');
  const [schemaExists, setSchemaExists] = useState<boolean>(false);
  const { provider, address } = useWallet();

  const SCHEMA = `(
    string employeeId,
    string jobId,
    uint256 timestamp,
    string action
  )`.replace(/\s+/g, ' ').trim();

  useEffect(() => {
    const fetchSchema = async () => {
      if (!provider || !address) return;

      try {
        const veraxSdk = new VeraxSdk(
          VeraxSdk.DEFAULT_LINEA_MAINNET_FRONTEND,
          address as `0x${string}`
        );
        const schemaId = (await veraxSdk.schema.getIdFromSchemaString(SCHEMA)) as Address;
        const alreadyExists = (await veraxSdk.schema.getSchema(schemaId)) as boolean;
        setSchemaId(schemaId);
        setSchemaExists(alreadyExists);
        if (alreadyExists) {
          onSchemaCreated(schemaId);
        }
      } catch (err) {
        console.error('Error checking schema:', err);
      }
    };

    fetchSchema();
  }, [provider, address]);

  const handleCreateSchema = async () => {
    if (!provider || !address) {
      setError('Please connect your wallet first');
      return;
    }

    setIsCreating(true);
    setError(null);
    
    try {
      // Request wallet interaction first
      const signer = await provider.getSigner();
      await signer.getAddress(); // This will trigger wallet popup

      const veraxSdk = new VeraxSdk(
        VeraxSdk.DEFAULT_LINEA_MAINNET_FRONTEND,
        address as `0x${string}`
      );

      const receipt = await veraxSdk.schema.create(
        'Paprika Time Log Schema',
        'Schema for tracking employee working hours at Paprika Studio',
        'https://paprikastudio.com/schemas/timelog',
        SCHEMA
      );

      // Wait for transaction confirmation
      if (receipt.transactionHash) {
        const txReceipt = await provider.getTransactionReceipt(receipt.transactionHash as string);
        if (txReceipt && txReceipt.status === 1) {
          onSchemaCreated(receipt.transactionHash as string);
        } else {
          throw new Error('Transaction failed');
        }
      }
    } catch (err) {
      console.error('Error creating schema:', err);
      setError(err instanceof Error ? err.message : 'Failed to create schema');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">Schema Management</h2>
      <button 
        onClick={handleCreateSchema} 
        disabled={!provider || isCreating}
        className="bg-paprika-red hover:bg-paprika-red-dark text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {isCreating ? 'Creating Schema...' : 'Create New Schema'}
      </button>
      {schemaExists && <p className="mt-2">{`Schema already exists, with ID ${schemaId} !`}</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
} 