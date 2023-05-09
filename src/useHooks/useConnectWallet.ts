import { providers } from "ethers/lib/ethers";
import { useRef, useState } from "react";
import Web3Modal from 'web3modal';

type returnType = [boolean, (needSigner?: boolean) => Promise<providers.Web3Provider | providers.JsonRpcSigner>, () => Promise<void>]

export const useConnectWallet = (): returnType => {
	const [walletConnected, setWalletConnected] = useState(false);
	const web3ModalRef = useRef<Web3Modal | null>(null);

	// Helper function to fetch a Provider/Signer instance from Metamask
	const getProviderOrSigner = async (needSigner = false) => {
		const provider = await web3ModalRef.current?.connect()
		const web3Provider = new providers.Web3Provider(provider)
		const { chainId } = await web3Provider.getNetwork();
		if (chainId !== 11155111) {
				window.alert("Change the network to Sepolia");
				throw new Error("Change network to Sepolia");
			}

		if (needSigner) {
			const signer = web3Provider.getSigner();
			return signer;
		}
		return web3Provider;
	}

	const connectWallet = async () => {
    if(!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "sepolia",
        providerOptions: {},
        disableInjectedProvider: false,
      })
    }

    try {
      await getProviderOrSigner()
      setWalletConnected(true)
    } catch (err) {
      console.log(err)
    }
  }

	return [walletConnected, getProviderOrSigner, connectWallet]
}