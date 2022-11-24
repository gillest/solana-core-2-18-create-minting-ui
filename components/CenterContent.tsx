import { HStack, Spacer } from "@chakra-ui/react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useRouter } from "next/router"
import { FC } from "react"
import styles from "../styles/Home.module.css"
import Connected from "./Connected"
import Disconnected from "./Disconnected"
import NewMint from "./NewMint"

const CenterContent: FC = () => {
  const router = useRouter()
  const { connected } = useWallet()
  const mintedAddress = router.query.mint ?? null;

  if (mintedAddress) {
    return (
      <NewMint />
    )
  } else {
    if (connected) {
      return (<Connected />)
    } else {
      return (<Disconnected />)
    }
  }
}

export default CenterContent