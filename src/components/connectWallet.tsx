"use client"; // this is a client component 👈🏽
import { useConnectWallet } from '@/useHooks/useConnectWallet';
import styles from "./style.module.scss"

export const ConnectWalletComponent = () => {
  const [walletConnected, getProviderOrSigner, connectWallet] = useConnectWallet()

  if (walletConnected) {
    return (
      <div className={styles.connectWallet}>
        <button>Connected</button>
      </div>
    );
  } else {
    return (
      <div className={styles.connectWallet}>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    );
  }
}