"use client"

import { useState } from "react";
import WalletContextProvider from "./components/WalletContextProvider";
import { Box, Spacer, Stack, VStack, Link } from "@chakra-ui/react";
import AppBar from "./components/AppBar";
import Initialize from "./components/Initialize";
import Increment from "./components/Increment";

export default function Home() {
  const [counter, setCounter] = useState("")
  const [transactionUrl, setTransactionUrl] = useState("")
  
  return (
    <div className="min-h-screen flex flex-col text-left bg-gray-800">
    <WalletContextProvider>
      <Box h="calc(100vh)" w="full">
        <Stack w="full" h="calc(100vh)" justify="center">
          <AppBar />
          <div className="h-full flex flex-col items-center justify-start text-[calc(10px+2vmin)] text-white pt-12">
            {
              counter ? (
                <VStack>
                  <Increment
                    counter={counter}
                    setTransactionUrl={setTransactionUrl}
                  />
                </VStack>
              ) : (
                <Initialize
                  setCounter={setCounter}
                  setTransactionUrl={setTransactionUrl}
                />
              )
            }
            <Spacer />
            {transactionUrl && (
              <Link href={transactionUrl} color="white" isExternal margin={8}>
                View most recent transaction
              </Link>
            )}
          </div>
        </Stack>
      </Box>
      </WalletContextProvider>
    </div>
  );
}
