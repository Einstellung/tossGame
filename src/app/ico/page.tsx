"use client";
import { ConnectWalletComponent } from "@/components/connectWallet";
import { useConnectWallet } from "@/useHooks/useConnectWallet";
import styles from './style.module.scss'
import { useContext, useEffect, useState } from "react";
import Home, { EmitterContext } from "../layout";
import { BigNumber, Contract } from "ethers";
import { BarbecueTokenAddress, BarbecueTokenABI } from "@/constants";
import { tokenDecimal } from "@/utils/SymbolChange";

function ICO() {
  const [ , getProviderOrSigner, ] = useConnectWallet()

  const [remainTokens, setRemainTokens] = useState("")
  const [walletConnected, setWalletConnected] = useState(false)

  const emitter = useContext(EmitterContext);

  const getRemainTokens = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(BarbecueTokenAddress, BarbecueTokenABI, provider);
      const remainTokens: BigNumber = await contract.remainTokens();
      setRemainTokens(tokenDecimal(remainTokens));
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    emitter?.on("walletConnected", () => {
      setWalletConnected(true)
      console.log("walletConnected")
    })
  }, [])

  useEffect(() => {
    setInterval(() => {
      getRemainTokens();
    }, 2000)
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Barbecue Token ICO 🥳</h1>
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.infoText}>If you have a Barbecue NFT, you can claim a Barbecue Token airdrop.</p>
          <p className={styles.infoText}>Each NFT can claim 100 tokens in the airdrop.</p>
          <p className={styles.infoText}>You can buy Barbecue Tokens at a price of 0.005 ETH each.</p>
          <p className={styles.infoText}>The total supply of Barbecue Tokens is 2000.</p>
          <p className={styles.infoText}>When the ICO tokens are sold out, you can participate in the Gold/USD price forecast to obtain more tokens. You can also buy tokens on the exchange page.</p>
        </div>
        <img src="./barbecue.jpeg" className={styles.image} />
      </div>
      {
        walletConnected &&
        <div className={styles.mint}>
          <button className={styles.button}>Airdrop</button>
          <div>
            <input type="number" min="1" max="2000" step="1" className={styles.input} />
            <button className={styles.button}>Buy</button>
          </div>
        </div>
      }
      <p>Remain {remainTokens} can be bought</p>
    </div>
  )
}

export default ICO