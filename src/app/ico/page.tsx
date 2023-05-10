"use client";
import { ConnectWalletComponent } from "@/components/connectWallet";
import { useConnectWallet } from "@/useHooks/useConnectWallet";
import styles from './style.module.scss'
import { useEffect } from "react";
import Home from "../page";

function ICO() {
  const [walletConnected, getProviderOrSigner, connectWallet] = useConnectWallet()

  return (
    <Home>
      <div className={styles.container}>
        <div className={styles.connectWallet}>
          <ConnectWalletComponent />
        </div>
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
      </div>
    </Home>
  )
}

export default ICO