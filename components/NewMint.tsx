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
import { Metaplex, Nft } from "@metaplex-foundation/js"
import { PublicKey } from "@solana/web3.js"

interface MyNft {
  name: string;
  image: string;
}

const NewMint: FC = () => {
  const { connection } = useConnection()
  const walletAdapter = useWallet()
  const router = useRouter()

  const metaplex = Metaplex.make(connection)

  const [mintedInfo, setMintedInfo] = useState<MyNft>();
  const fetchNft = async () => {
    const mintedAddress = router.query.mint ?? null;
    if (mintedAddress == null) {
      return
    }
  
    const nftPayload = await metaplex.nfts().findByMint({ 
      mintAddress:   new PublicKey(mintedAddress)
    })

    let fetchResult = await fetch(nftPayload.uri)
    let json = await fetchResult.json()

    console.log(json);

    if (json.symbol == "GALX") {
      setMintedInfo(json)
    }
  }

  useEffect(() => {
    fetchNft()
  }, [walletAdapter])

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
        {mintedInfo && mintedInfo.image ? <Image src={mintedInfo.image} alt="" /> : ''}
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
