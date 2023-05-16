"use client"
import { BigNumber, Contract, utils } from "ethers";
import styles from "./style.module.scss"
import { useConnectWallet } from "@/useHooks/useConnectWallet";
import { ExchangeAddress, ExchangeABI, BarbecueTokenAddress, BarbecueTokenABI } from "@/constants";
import { useEffect, useState } from "react";
import { tokenDecimal } from "@/utils/SymbolChange";
import { debounce } from "@/utils/debounce";

// interact with solidity function name should add "_"
function Exchange() {

  const [, getProviderOrSigner,] = useConnectWallet()
  const [bbqToETHRatio, setbbqToETHRatio] = useState<undefined | string>()

  const [ethAddLiquidityAmount, setEthAddLiquidityAmount] = useState("")
  const [BBQAddLiquidityAmount, setBBQAddLiquidityAmount] = useState("")

  // remove liquidity variable
  const [removeLPAmount, setRemoveLPAmount] = useState("")
  const [removeEthAmount, setRemoveEthAmount] = useState<undefined | number>()
  const [removeBBQAmount, setRemoveBBQAmount] = useState<undefined | number>()

  const [selectOption, setSelectOption] = useState("eth")
  // show after swap you can take in the front
  const [swapShowVal, setSwapShowVal] = useState("")
  // swap token to then contract amount
  const [swapSendVal, setSwapSendVal] = useState("")

  const providerOrSignerInst = async (contractAdd: string, contractABI: Array<any>, signer = false) => {
    let contract
    if (signer) {
      const signer = await getProviderOrSigner(true);
      contract = new Contract(contractAdd, contractABI, signer);
    } else {
      const provider = await getProviderOrSigner();
      contract = new Contract(contractAdd, contractABI, provider);
    }
    return contract
  }

  const _getBarbecueToETHSwap = async (bbqAmount: string) => {
    try {
      const contract = await providerOrSignerInst(ExchangeAddress, ExchangeABI);
      const bbqWei = utils.parseEther(bbqAmount)
      const result = await contract.getBarbecueTokenToEthSwap(bbqWei)
      return tokenDecimal(result)
    } catch (err) {
      console.error(err)
    }
  }

  const _getETHToBarbecueSwap = async (ethAmount: string) => {
    try {
      const contract = await providerOrSignerInst(ExchangeAddress, ExchangeABI);
      const ethWei = utils.parseEther(ethAmount)
      const result = await contract.getEthToBarbecueTokenSwap(ethWei)
      return tokenDecimal(result)
    } catch (err) {
      console.error(err)
    }
  }

  const _addLiquidityInitial = async () => {
    try {
      const exchangeContract = await providerOrSignerInst(ExchangeAddress, ExchangeABI, true);
      const barbecueTokenContract = await providerOrSignerInst(BarbecueTokenAddress, BarbecueTokenABI, true);

      const BBQAddWei = BigNumber.from(utils.parseEther("10"))
      const etherAmountWei = BigNumber.from(utils.parseEther("0.01"))
      let tx = await barbecueTokenContract.approve(ExchangeAddress, BBQAddWei)
      await tx.wait()
      tx = await exchangeContract.addLiquidity(BBQAddWei, {
        value: etherAmountWei
      })
      await tx.wait()
      alert("finish add liquidity")
    } catch (err) {
      console.error(err)
    }
  }

  const _addLiquidity = async () => {
    if (Number(ethAddLiquidityAmount) > 0 && Number(BBQAddLiquidityAmount) > 0) {
      try {
        const exchangeContract = await providerOrSignerInst(ExchangeAddress, ExchangeABI, true)
  
        const tokenContract = await providerOrSignerInst(BarbecueTokenAddress, BarbecueTokenABI, true)
  
        const BBQAddWei = BigNumber.from(utils.parseEther(BBQAddLiquidityAmount))
        const ethAmountWei = BigNumber.from(utils.parseEther(ethAddLiquidityAmount))
  
        // Because BAR tokens are an ERC20, user would need to give the contract allowance
        // to take the required number BAR tokens out of his contract
        let tx = await tokenContract.approve(ExchangeAddress, BBQAddWei)
        await tx.wait()
        tx = await exchangeContract.addLiquidity(BBQAddWei, {
          value: ethAmountWei
        })
        await tx.wait()
        alert("finish add liquidity")
      } catch (e) {
        console.error(e)
      }
    }
  }

  const _removeLiquidity = async () => {
    if (Number(removeLPAmount) > 0) {
      try {
        const exchangeContract = await providerOrSignerInst(ExchangeAddress, ExchangeABI, true)
        const removeLPWei = BigNumber.from(utils.parseEther(removeLPAmount))

        const tx = await exchangeContract.removeLiquidity(removeLPWei)
        await tx.wait()
        alert("finish remove liquidity")
      } catch (e) {
        console.error(e)
      }
    }
  }

  const _tokenSwap = async () => {
    if (Number(swapSendVal) > 0) {
      try {
        const exchangeContract = await providerOrSignerInst(ExchangeAddress, ExchangeABI, true)
        const tokenContract = await providerOrSignerInst(BarbecueTokenAddress, BarbecueTokenABI, true)

        const swapWei = BigNumber.from(utils.parseEther(swapSendVal))

        let tx
        if (selectOption === "eth") {
          tx = await exchangeContract.setEthToBarbecueTokenSwap(swapWei)
        } else {
          const gasLimit = 300000; // 根据实际情况调整

          tx = await tokenContract.approve(ExchangeAddress, swapWei)
          await tx.wait()
          tx = await exchangeContract.setBarbecuTokenToEthSwap(swapWei,{gasLimit})
        }
        await tx.wait()
        alert("finish swap")
      } catch (e) {
        console.error(e)
      }
    }
  }

  // show after swap you can get coin amount
  const fetchSwapData = async (amount: string) => {
    if (Number(amount) > 0) {
      if (selectOption === "eth") {
        const val = await _getETHToBarbecueSwap(amount)
        if (val) {
          setSwapShowVal(val)
        }
      } else {
        const val = await _getBarbecueToETHSwap(amount)
        if (val) {
          setSwapShowVal(val)
        }
      }
    }
  }
  const debounceSwap = debounce(fetchSwapData, 500)

  // Display the amount of BBQ tokens you need to add when providing liquidity
  const calAddLiquidityBBQTokenAmount = (eth: string) => {
    const ethNum = Number(eth)
    if (ethNum > 0 && bbqToETHRatio) {
      setBBQAddLiquidityAmount((ethNum / Number(bbqToETHRatio)).toString())
    }
    return ethNum / Number(bbqToETHRatio)
  }
  const debounceCalAddLiquidityBBQToken = debounce(calAddLiquidityBBQTokenAmount, 500)

  const calRemoveLiquidityLPTokenAmount = async (LPToken: string) => {
    try {
      const provider = await getProviderOrSigner();
      let _ethBalance: any = await provider.getBalance(ExchangeAddress)
      _ethBalance = tokenDecimal(_ethBalance)

      const contract = await providerOrSignerInst(ExchangeAddress, ExchangeABI);
      let _LPTotoalSupply = await contract.totalSupply()
      _LPTotoalSupply = tokenDecimal(_LPTotoalSupply)

      let _bbqTokenReserve = await contract.getReserve()
      _bbqTokenReserve = tokenDecimal(_bbqTokenReserve)
      
      const removeEth = (Number(_ethBalance) * Number(LPToken)) / Number(_LPTotoalSupply)
      const removeBBQ = (Number(_bbqTokenReserve) * Number(LPToken)) / Number(_LPTotoalSupply)

      setRemoveBBQAmount(removeBBQ)
      setRemoveEthAmount(removeEth)
    } catch(e) {
      console.error("calRemoveLiquidityLPTokenAmounterror", e)
    }
  }
  const debounceCalRemoveLiquidityLPTokenAmount = debounce(calRemoveLiquidityLPTokenAmount, 500)

  // request ratio effect
  useEffect(() => {
    const interval = setInterval(async () => {
      const val = await _getBarbecueToETHSwap("1")
      if (val) {
        setbbqToETHRatio(val)
      }
    }, 3000)
    return () => { clearInterval(interval) }
  }, [])

  // first render page get ratio as quick as possible
  useEffect(() => {
    const getRatio = async () => { 
      const val = await _getBarbecueToETHSwap("1")
      if (val) {
        setbbqToETHRatio(val)
      }
    }
    getRatio()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Welcome to DEX 🤝</h1>
        <h3 className={styles.subtitle}>The DEX matches transactions using the Uniswap V1 AMM mechanism</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <p>You can exchange between Barbecue Token and ETH</p>
          <p>You can also stake your Barbecue Token and ETH to add DEX liquidity</p>
          <p>Each exchange charges a 1% fee as a reward for liquidity providers</p>
        </div>
        <img src="./dex.jpeg" className={styles.image} />
      </div>

      <p>Exchange Rate: 1 BBQ token = {bbqToETHRatio} ETH</p>
      <p>LP Pool</p>
      <p>Your LP Pool token amount</p>
      <div className={styles.actions}>
        <div className={styles.liquidityStyle}>
          <div className={styles.liqui}>
            <div className={styles.optionContainer}>
              <input type="number" placeholder="ETH Amount" className={styles.numberInput} onChange={e => {
                debounceCalAddLiquidityBBQToken(e.target.value)
                setEthAddLiquidityAmount(e.target.value)
              }}/>
              <button className={styles.button} onClick={() => {
                _addLiquidity()
                // _addLiquidityInitial()
              }}>Add liquidity</button>
            </div>
            <p className={styles.inputResult}>You will need to add <strong>{BBQAddLiquidityAmount}</strong> Barbecue tokens</p>
          </div>
          <div className={styles.liqui}>
            <div className={styles.optionContainer}>
              <input type="number" className={styles.numberInput} placeholder="LP Amount" onChange={e => {
                debounceCalRemoveLiquidityLPTokenAmount(e.target.value)
                setRemoveLPAmount(e.target.value)
              }}/>
              <button className={styles.button} onClick={_removeLiquidity
              }>Remove liquidity</button>
            </div>
            <p className={styles.inputResult}>You will get {removeBBQAmount} BBQ tokens and {removeEthAmount} ETH tokens</p>
          </div>
        </div>

        <br />
        <br />
        <div className={styles.optionContainer}>
          <input type="number" className={styles.numberInput} onChange={e => {
            debounceSwap(e.target.value)
            setSwapSendVal(e.target.value)
          }} />
          <select name="dropdown" id="dropdown" className={styles.select} onChange={e => {
            setSelectOption(e.target.value)
          }}>
            <option value="eth">Ethereum</option>
            <option value="barbecueToken">Barbecue Token</option>
          </select>
          <button className={styles.button} onClick={_tokenSwap}>Swap</button>
        </div>
        {
          swapShowVal &&
          <p className={styles.inputResult}>You will get {selectOption === 'eth' ? `${swapShowVal} Barbecue` : `${swapShowVal} Ethereum`} tokens</p>
        }
      </div>
    </div>
  );
}

export default Exchange
