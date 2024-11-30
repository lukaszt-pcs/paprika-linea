'use client';

import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { useWallet } from '../providers/WalletProvider';
import { QrCode, LogIn, LogOut } from 'lucide-react';
import { WalletProvider } from '../providers/WalletProvider';
import { AttestationViewer } from '../components/user/AttestationViewer';

function UserContent() {
  const [scanning, setScanning] = useState(false);
  const [scanType, setScanType] = useState<'start' | 'end' | null>(null);
  const [lastScan, setLastScan] = useState<string | null>(null);
  const { address, connect } = useWallet();

  const startScanning = (type: 'start' | 'end') => {
    setScanType(type);
    setScanning(true);
  };

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText: string) => {
          setLastScan(`${scanType?.toUpperCase()} - ${decodedText}`);
          setScanning(false);
          setScanType(null);
          scanner.clear();
        },
        (errorMessage: string) => {
          console.warn(errorMessage);
        }
      );

      return () => {
        scanner.clear();
      };
    }
  }, [scanning, scanType]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-paprika-red mb-4">
          Employee Time Logger
        </h1>
        
        {!address ? (
          <button
            onClick={connect}
            className="bg-paprika-red hover:bg-paprika-red-dark text-white px-6 py-2 rounded-lg"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-6">Connected: {address}</p>
            <div className="w-full max-w-md space-y-8">
              {scanning ? (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="text-lg font-bold mb-2 text-center">
                      {scanType === 'start' ? 'Scan Work Entry QR' : 'Scan Work End QR'}
                    </h3>
                    <div id="reader" className="w-full"></div>
                  </div>
                  <Button 
                    onClick={() => {
                      setScanning(false);
                      setScanType(null);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Cancel Scanning
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button 
                    onClick={() => startScanning('start')}
                    className="w-full h-24 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center gap-2"
                  >
                    <LogIn className="h-8 w-8" />
                    <span>Scan Work Entry QR</span>
                  </Button>

                  <Button 
                    onClick={() => startScanning('end')}
                    className="w-full h-24 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center gap-2"
                  >
                    <LogOut className="h-8 w-8" />
                    <span>Scan Work End QR</span>
                  </Button>

                  <AttestationViewer address={address} />

                  {lastScan && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-bold mb-2">Last Scan:</h3>
                      <p className="text-sm break-all">{lastScan}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function UserPage() {
  return (
    <WalletProvider>
      <UserContent />
    </WalletProvider>
  );
} 