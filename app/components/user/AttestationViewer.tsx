'use client';

import { useState, useEffect } from 'react';
import { VeraxSdk } from '@verax-attestation-registry/verax-sdk';
import { Clock, CheckCircle } from 'lucide-react';

interface Attestation {
  id: string;
  timestamp: string;
  action: string;
  jobId: string;
}

export function AttestationViewer({ address }: { address: string }) {
  const [attestations, setAttestations] = useState<Attestation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttestations = async () => {
      try {
        const veraxSdk = new VeraxSdk(VeraxSdk.DEFAULT_LINEA_MAINNET_FRONTEND);
        
        // Get attestation ID from the schema
        const schemaId = await veraxSdk.schema.getIdFromSchemaString(`(
          string employeeId,
          string jobId,
          uint256 timestamp,
          string action
        )`);

        // Get attestation by ID
        const attestation = await veraxSdk.attestation.getAttestation(schemaId);
        
        if (attestation) {
          const formattedAttestation: Attestation = {
            id: attestation.id,
            timestamp: new Date(Number(attestation.attestationData.timestamp) * 1000).toLocaleString(),
            action: attestation.attestationData.action,
            jobId: attestation.attestationData.jobId
          };
          
          setAttestations([formattedAttestation]);
        }
      } catch (err) {
        console.error('Failed to fetch attestations:', err);
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      fetchAttestations();
    }
  }, [address]);

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Work History
          </h2>
        </div>
        
        <div className="p-4">
          {loading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-paprika-red"></div>
            </div>
          ) : attestations.length === 0 ? (
            <p className="text-gray-500 text-center">No work records found</p>
          ) : (
            <div className="space-y-4">
              {attestations.map((att) => (
                <div key={att.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {att.action.toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-500">Job ID: {att.jobId}</p>
                    </div>
                    <p className="text-sm text-gray-500">{att.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 