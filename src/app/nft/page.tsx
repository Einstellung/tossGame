"use client"; // this is a client component 👈🏽
import { useEffect, useState, useRef } from 'react';
import { Contract, ethers } from 'ethers';
import { BarbecueNFTAddress, BarbecueNFTABI } from '@/constants';
import { useConnectWallet } from '@/useHooks/useConnectWallet';
import styles from './style.module.scss';

function HomePage() {
  const [walletConnected, getProviderOrSigner, connectWallet] = useConnectWallet()

  const [nftBalance, setNftBalance] = useState(0);
  const [isOwner, setIsOwner] = useState(false);

  const mintNFT = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      // If you want to send eth to contract, you should use parseEther, then mint(value)
      const priceInWei = ethers.utils.parseEther("0.1")
      const contract = new Contract(BarbecueNFTAddress, BarbecueNFTABI, signer);
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
      const contract = new Contract(BarbecueNFTAddress, BarbecueNFTABI, provider);
      let balance = await contract.getNFTBalance();
      balance = balance.toString();
      setNftBalance(balance);
    } catch (err) {
      // console.log(err)
    }
  }

  const withdraw = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(BarbecueNFTAddress, BarbecueNFTABI, signer);
      await contract.withdraw();
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setInterval(() => {
      getNFTBalance();
    }, 2000)
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let&apos; mint some Barbecue NFT 🎉</h1>
      <h1 className={styles.subtitle}>Total NFT supply is limited to 20 👀</h1>
      <div className={styles.info}>
        <p>If you own an NFT, you can receive a Barbecue Token airdrop</p>
        <p>Each NFT can claim 100 Barbecue Tokens</p>
        <p>The price of each NFT is 0.1 ETH</p>
        <p>Each address can mint up to 2 NFTs</p>
      </div>
      <div className={styles.mint}>
        <input type="number" min="0" max="2" step="1" />
        <button onClick={mintNFT}>mint your nft</button>
        <p className={styles.remaining}>Remaining NFTs available for minting: {nftBalance}</p>
      </div>
      {/* <button onClick={withdraw}>withdraw</button> */}
    </div>
  );
}

export default HomePage;
