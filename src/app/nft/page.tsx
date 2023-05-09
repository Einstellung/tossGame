"use client"; // this is a client component 👈🏽
import { useEffect, useState, useRef } from 'react';
import { Contract, ethers, providers } from 'ethers';
import { BarbecureNFTAddress, BarbecureNFTABI } from '@/constants';
import { useConnectWallet } from '@/useHooks/useConnectWallet';
import styles from './style.module.scss';
import { ConnectWalletComponent } from '@/components/connectWallet';

function HomePage() {
  const [walletConnected, getProviderOrSigner, connectWallet] = useConnectWallet()

  const [nftBalance, setNftBalance] = useState(0);
  const [isOwner, setIsOwner] = useState(false);

  const mintNFT = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      // If you want to send eth to contract, you should use parseEther, then mint(value)
      const priceInWei = ethers.utils.parseEther("0.1")
      const contract = new Contract(BarbecureNFTAddress, BarbecureNFTABI, signer);
      const tx = await contract.mint({value: priceInWei});
      await tx.wait();
      alert("Mint success")
    } catch (err) {
      console.log(err)
    }
  }

  const getNFTBalance = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(BarbecureNFTAddress, BarbecureNFTABI, provider);
      let balance = await contract.getNFTBalance();
      balance = balance.toString();
      setNftBalance(balance);
      console.log(balance.toString());
    } catch (err) {
      // console.log(err)
    }
  }

  useEffect(() => {
    setInterval(() => {
      getNFTBalance();
    }, 2000)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.connectWallet}>
        <ConnectWalletComponent />
      </div>
      <h1 className={styles.title}>Let's mint some Barbecure NFT 🎉</h1>
      <h1 className={styles.subtitle}>Total NFT supply is limited to 20 👀</h1>
      <div className={styles.info}>
        <p>If you own an NFT, you can receive a Barbecure Token airdrop</p>
        <p>Each NFT can claim 100 Barbecure Tokens</p>
        <p>The price of each NFT is 0.1 ETH</p>
        <p>Each address can mint up to 2 NFTs</p>
      </div>
      <div className={styles.mint}>
        <input type="number" min="0" max="2" step="1" />
        <button onClick={mintNFT}>mint your nft</button>
        <p className={styles.remaining}>Remaining NFTs available for minting: {nftBalance}</p>
      </div>
    </div>
  );
}

export default HomePage;
