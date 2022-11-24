import { FC, MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react"
import {
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/router"
import { Metaplex } from "@metaplex-foundation/js"
import { PublicKey } from "@solana/web3.js"

const NewMint: FC = () => {
  const { connection } = useConnection()
  const walletAdapter = useWallet()
  const router = useRouter()

  const metaplex = Metaplex.make(connection)

  const [mintedInfo, setMintedInfo] = useState<object>();
  const fetchNft = async () => {
    const mintedAddress = router.query.mint ?? null;
    if (mintedAddress == null) {
      return
    }
  
    const nft = await metaplex.nfts().findByMint({ 
      mintAddress:   new PublicKey(mintedAddress)
    })

    console.log(nft)
    console.log(typeof nft)

    if (nft) {
      setMintedInfo(nft)
    }

  }

  useEffect(() => {
    fetchNft()
  }, [walletAdapter, mintedInfo])


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
            A new Galaxy NFT appeared just for you!! 
          </Heading>

          <Text color="bodyText" fontSize="xl" textAlign="center">
            How lucky you are to have collected
            <Text as="b"> $CCC</Text> Use your <Text as="b"> $CCC</Text> to
            enjoy NFTs reserved for the private club
          
          </Text>
        </VStack>
      </Container>

      <HStack spacing={10}>
        {mintedInfo ? <Image src={mintedInfo.json.image} alt="" /> : ''}
      </HStack>

      <Button bgColor="accent" color="white" maxW="380px">
        <HStack>
          <Text>mint buildoor</Text>
          <ArrowForwardIcon />
        </HStack>
      </Button>
    </VStack>
  )
}

export default NewMint
