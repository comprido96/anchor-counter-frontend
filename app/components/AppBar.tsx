"use client"

import Image from 'next/image'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function AppBar() {
    return (
        <div className="h-[90px] flex bg-black flex-row items-center justify-between text-5xl text-white px-5 flex-wrap">
            <Image src="/solanaLogo.png" height={30} width={200} alt={''} />
            <span>PING COUNTER PROGRAM FRONTEND</span>
            <WalletMultiButton />
        </div>
    )
}