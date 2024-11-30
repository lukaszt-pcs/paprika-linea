'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PortalManager } from '../components/admin/PortalManager';
import { SchemaManager } from '../components/admin/SchemaManager';
import { WalletProvider } from '../providers/WalletProvider';
import { useWallet } from '../providers/WalletProvider';

function AdminContent() {
  const [portalId, setPortalId] = useState<string | null>(null);
  const [schemaId, setSchemaId] = useState<string | null>(null);
  const { address, connect } = useWallet();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/pap_logo.png"
          alt="Paprika Studio Logo"
          width={120}
          height={120}
          className="mb-4"
        />
        <h1 className="text-3xl font-bold text-paprika-red mb-4">
          Paprika Studio Admin
        </h1>
        
        {!address ? (
          <button
            onClick={connect}
            className="bg-paprika-red hover:bg-paprika-red-dark text-white px-6 py-2 rounded-lg"
          >
            Connect Wallet
          </button>
        ) : (
          <p className="text-sm text-gray-600">
            Connected Wallet: {address}
          </p>
        )}
      </div>
      
      {address && (
        <div className="space-y-6">
          <SchemaManager onSchemaCreated={setSchemaId} />
          <PortalManager onPortalCreated={setPortalId} />
          
          {(schemaId || portalId) && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold mb-2">Created Resources:</h3>
              {schemaId && <p>Schema ID: {schemaId}</p>}
              {portalId && <p>Portal ID: {portalId}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <WalletProvider>
      <AdminContent />
    </WalletProvider>
  );
} 