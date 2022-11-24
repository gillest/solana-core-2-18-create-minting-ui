import { FC, MouseEventHandler, useCallback, useMemo, useState } from "react"
import {
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
  Center,
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { CandyMachine, Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js"
import { PublicKey } from "@solana/web3.js"


const Connected: FC = () => {
  const router = useRouter()
  const walletAdapter = useWallet();
  const { connection } = useConnection();
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
  const [isMinting, setIsMinting] = useState(false)
  const [candyMachine, setCandyMachine] = useState<CandyMachine>()

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      const candyMachine = await metaplex.candyMachinesV2().findByAddress({address: new PublicKey("7GnVvA2JQkfHosLACNTMQEXHuh9kp9MM9Npe1wrxgSdX")});

      console.log(candyMachine);
      
      if (event.defaultPrevented) return;
      if (!walletAdapter.connected || !candyMachine) return;
  
      try {
        setIsMinting(true);
        const nft = await metaplex.candyMachinesV2().mint({ candyMachine });        
  
        router.push(`/?mint=${nft.nft.address.toBase58()}`);
      } catch (error) {
        console.log(error);
        alert(error);
      } finally {
        setIsMinting(false);
      }
    },
    [metaplex, walletAdapter, router]
  );  

  const handleStakeClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {

      alert('Not implemented')

      console.log(candyMachine);
      
      if (event.defaultPrevented) return;
      if (!walletAdapter.connected || !candyMachine) return;
  
      try {
      } catch (error) {
        alert(error);
      } finally {
      }
    },
    [walletAdapter, candyMachine]
  );  

  

  return (
    <VStack spacing={20}>
      <Container>
        <VStack spacing={8}>
          <Heading
            color="white"
            as="h1"
            size="2xl"
            noOfLines={1}
            textAlign="center"
          >
            Welcome Buildoor.
          </Heading>

          <Text color="bodyText" fontSize="xl" textAlign="center">
            Each buildoor is randomly generated and can be staked to receive
            <Text as="b"> $BLD</Text> Use your <Text as="b"> $BLD</Text> to
            upgrade your buildoor and receive perks within the community!
          </Text>
        </VStack>
      </Container>

      <HStack spacing={10}>
        <Image src="avatar1.png" alt="" />
        <Image src="avatar2.png" alt="" />
        <Image src="avatar3.png" alt="" />
        <Image src="avatar4.png" alt="" />
        <Image src="avatar5.png" alt="" />
      </HStack>

      <Button bgColor="accent" color="white" maxW="380px">
      <Button
          bgColor="accent"
          color="white"
          maxWidth="380px"
          onClick={handleClick}
        >
          <HStack>
            <Text>mint buildoor</Text>
            <ArrowForwardIcon />
          </HStack>
        </Button>
      </Button>

      <Center>
        <Button
          bgColor="accent"
          color="white"
          maxWidth="380px"
          onClick={handleStakeClick}
        >
          <HStack>
            <Text>stake my buildoor</Text>
            <ArrowForwardIcon />
          </HStack>
        </Button>
      </Center>


    </VStack>
  )
}

export default Connected
