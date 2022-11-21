import { Box, Button, Center, HStack, Image, Spacer, Stack, Text } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import Disconnected from "../components/Disconnected"
import NavBar from "../components/NavBar"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import Connected from "../components/Connected"
import { MouseEventHandler, useCallback, useState } from "react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Router, useRouter } from "next/router"
import { CandyMachine, Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js"
import { PublicKey } from "@solana/web3.js"

const Home: NextPage = () => {
  const { connected } = useWallet()
  const router = useRouter()
  const walletAdapter = useWallet();
  const { connection } = useConnection();
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
  const [isMinting, setIsMinting] = useState(false)

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      const candyMachine = await metaplex.candyMachines().findByAddress({address: new PublicKey("6nQ3xk9Rk37qKLxMyd7V3K71AJTh1Aq8Yv7cwgbDBcRF")}).run();

      console.log(candyMachine);
      
      if (event.defaultPrevented) return;
      if (!walletAdapter.connected || !candyMachine) return;
  
      try {
        setIsMinting(true);
        const nft = await metaplex.candyMachines().mint({ candyMachine }).run();
  
        console.log(nft);
        router.push(`/newMint?mint=${nft.nft.address.toBase58()}`);
      } catch (error) {
        console.log(error);
        alert(error);
      } finally {
        setIsMinting(false);
      }
    },
    [metaplex, walletAdapter, router]
  );  

  return (
    <div className={styles.container}>
      <Head>
        <title>Buildoors</title>
        <meta name="The NFT Collection for Buildoors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        w="full"
        h="calc(100vh)"
        bgImage={connected ? "" : "url(/home-background.svg)"}
        backgroundPosition="center"
      >
        <Stack w="full" h="calc(100vh)" justify="center">
          <NavBar />

          <Spacer />
          <Center>
            {connected ? <Connected /> : <Disconnected />}
          </Center>

          <Center>
            <Button
              bgColor="accent"
              color="white"
              maxWidth="380px"
              onClick={handleClick}
            >
              <HStack>
                <Text>stake my buildoor</Text>
                <ArrowForwardIcon />
              </HStack>
            </Button>
          </Center>

          <Spacer />
          <Image src="" alt="" />


          <Center>
            <Box marginBottom={4} color="white">
              <a
                href="https://twitter.com/_buildspace"
                target="_blank"
                rel="noopener noreferrer"
              >
                built with @_buildspace xxx
              </a>
            </Box>
          </Center>
        </Stack>
      </Box>
    </div>
  )
}

export default Home
