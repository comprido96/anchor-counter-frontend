"use client"

import {
    useConnection,
    useWallet,
    useAnchorWallet,
  } from "@solana/wallet-adapter-react"

import * as anchor from "@project-serum/anchor"
import { FC, useEffect, useState } from "react"
import idl from "../../idl.json"
import { Button } from "@chakra-ui/react"
  
const PROGRAM_ID = new anchor.web3.PublicKey(
  `9pbyP2VX8Rc7v4nR5n5Kf5azmnw5hHfkJcZKPHXW98mf`
)

export interface Props {
  setCounter: any
  setTransactionUrl: any
}

export default function Initialize({ setCounter, setTransactionUrl }: Props) {
  const [program, setProgram] = useState<anchor.Program>() 
  const { connection } = useConnection()
  const wallet = useAnchorWallet()

  useEffect(() => {
    let provider: anchor.Provider;

    try {
      provider = anchor.getProvider();
    }
    catch {
      if(!wallet) {
        alert("wallet not set")
        return
      }
      provider = new anchor.AnchorProvider(connection, wallet, {});
      anchor.setProvider(provider);
    }

    const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID);
    setProgram(program);
  }, [])

  const onClick = async () => {
    const newKeypair = anchor.web3.Keypair.generate()
    const sig = await program?.methods
    .initialize()
    .accounts(
      {
        "counter": newKeypair.publicKey,
        "user": wallet?.publicKey,
        "systemProgram": anchor.web3.SystemProgram.programId
      })
    .signers([newKeypair])
    .rpc()

    setTransactionUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
    setCounter(newKeypair.publicKey);
  }

  return <Button onClick={onClick}>Initialize Counter</Button>
}
