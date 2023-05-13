"use client";
import { useConnectWallet } from '@/useHooks/useConnectWallet';
import styles from "./style.module.scss"
import { useContext, useEffect } from 'react';
import { EmitterContext } from '@/app/layout';

export const ConnectWalletComponent = () => {
  const [walletConnected, getProviderOrSigner, connectWallet] = useConnectWallet()

  const emitter = useContext(EmitterContext);

  useEffect(() => {
    if (walletConnected) {
      emitter?.emit("walletConnected", walletConnected)
    }
  }, [walletConnected])

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