'use client';

import { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  provider: ethers.BrowserProvider | null;
  address: string | null;
  connect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  provider: null,
  address: null,
  connect: async () => {},
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const connect = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      console.log('Requesting wallet connection...');
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Wallet connected');

      // Switch to Linea network
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xe708' }], // Linea Mainnet
        });
      } catch (switchError: any) {
        // Add Linea if not available
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xe708',
              chainName: 'Linea Mainnet',
              nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
              rpcUrls: ['https://rpc.linea.build'],
              blockExplorerUrls: ['https://lineascan.build']
            }]
          });
        }
      }

      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      await ethersProvider.send('eth_requestAccounts', []);
      const signer = await ethersProvider.getSigner();
      const userAddress = await signer.getAddress();
      
      setProvider(ethersProvider);
      setAddress(userAddress);
    } catch (err) {
      console.error('Failed to connect:', err);
    }
  };

  return (
    <WalletContext.Provider value={{ provider, address, connect }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext); 