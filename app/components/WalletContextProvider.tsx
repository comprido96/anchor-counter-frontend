"use client"

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as web3 from '@solana/web3.js'
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
require('@solana/wallet-adapter-react-ui/styles.css');

export default function WalletContextProvider({children}: any) {
    const endpoint = web3.clusterApiUrl('devnet')
	const wallets = useMemo(() => {
        return [
          new walletAdapterWallets.PhantomWalletAdapter(),
          new walletAdapterWallets.SolflareWalletAdapter(),
        ]
      }, [])

	return (
		<ConnectionProvider endpoint={endpoint}>
	    <WalletProvider wallets={wallets}>
	      <WalletModalProvider>
	        { children }
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
	)
}