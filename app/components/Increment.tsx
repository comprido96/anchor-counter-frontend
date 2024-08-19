"use client"

import {
    useConnection,
    useAnchorWallet,
  } from "@solana/wallet-adapter-react"
  import * as anchor from "@project-serum/anchor"
  import { useEffect, useState } from "react"
  import idl from "../../idl.json"
  import { Button, HStack, VStack, Text } from "@chakra-ui/react"
  
  const PROGRAM_ID = `9pbyP2VX8Rc7v4nR5n5Kf5azmnw5hHfkJcZKPHXW98mf`

export interface Props {
  counter: any
  setTransactionUrl: any
}

export default function Increment({counter, setTransactionUrl}: Props) {
  const [count, setCount] = useState(0)
  const [program, setProgram] = useState<anchor.Program>()
  const { connection } = useConnection()
  const wallet = useAnchorWallet()

  useEffect(() => {
    let provider: anchor.Provider

    try {
      provider = anchor.getProvider()
    } catch {
      provider = new anchor.AnchorProvider(connection, wallet, {})
      anchor.setProvider(provider)
    }

    const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID)
    setProgram(program)
    refreshCount(program)
  }, [])

  const incrementCount = async () => {
    if(!program || !wallet) {
      alert("wallet or program undefined")
      return
    }
    const sig = await program.methods
      .increment()
      .accounts({
        counter: counter,
        user: wallet.publicKey,
      })
      .rpc()

    setTransactionUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`)
  }

  const refreshCount = async (program: any) => {
    const counterAccount = await program.account.counter.fetch(counter)
    setCount(counterAccount.count.toNumber())
  }

  return (
    <VStack>
      <HStack>
        <Button onClick={incrementCount}>Increment Counter</Button>
        <Button onClick={() => refreshCount(program)}>Refresh count</Button>
      </HStack>
      <Text color="white">Count: {count}</Text>
    </VStack>
  )
}