"use client"
import { useConnectWallet } from '@/useHooks/useConnectWallet';
import styles from './style.module.scss';
import { useState } from 'react';
import { BigNumber, Contract, utils } from 'ethers';
import { BarbecueTokenABI, BarbecueTokenAddress, OracleABI, OracleAddress } from '@/constants';

function TossCoin() {

  const [, getProviderOrSigner,] = useConnectWallet()

  const [stakeBBQVal, setStakeBBQVal] = useState<undefined | string>("")
  const [tossRes, setTossRes] = useState<undefined | string>("heads") // ['heads', 'tails'
  const [rewardStakeVal, setRewardStake] = useState<undefined | string>("")

  const _stakeBBQ = async () => {
    if (stakeBBQVal) {
      try {
        const singer = await getProviderOrSigner(true)
        const oracleContract = new Contract(OracleAddress, OracleABI, singer)
        const bbqTokenContract = new Contract(BarbecueTokenAddress, BarbecueTokenABI, singer)

        oracleContract.on("TestRequestId", (requestId, amount, isHead) => {
          console.log("TestRequestId: ", requestId, amount.toString(), isHead);
        })

        oracleContract.on("TestTransfer", (user, amount) => {
          console.log("TestRequestId: ", user, amount.toString());
        })
  
        const bbqWei = BigNumber.from(utils.parseEther(stakeBBQVal))
        let tx = await bbqTokenContract.approve(OracleAddress, bbqWei)
        await tx.wait()


        const gasLimit = 300000; // 根据实际情况调整
        const result = tossRes === 'heads' ? true : false
        tx = await oracleContract.makePrediction(result, bbqWei, {gasLimit})
        await tx.wait()

        oracleContract.on("PredictionResult", (userAddress, success, amount) => {
          console.log("Prediction Result: ", userAddress, success, amount.toString());
        });

        alert("stakes BBQ success")

      } catch(e) {
        console.log("_stakeBBQ error", e)
      }
    }
  }

  const _claimReward = async () => {

  }


  return (
    <div className={styles.tossCoinContainer}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Welcome to play Toss Coin Game 💰 </h1>
        <h3 className={styles.subtitle}>We use Chainlink VRF to generate random numbers</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <p>This game simulates a coin toss game</p>
          <p>You can stake BBQ coins and predict whether the coin will land on heads or tails</p>
          <p>If you predict correctly, you can win 110% of the BBQ coins you staked as a reward</p>
          <p>If you predict incorrectly, you can claim 90% of the BBQ coins you staked as a penalty</p>
        </div>
        <img src="./tossImg.jpeg" alt="Coin toss game" className={styles.image} />
      </div>
      <div className={styles.inputContainer}>
        <input type="number" className={styles.numberInput} placeholder='BBQ stack' onChange={e => {
          setStakeBBQVal(e.target.value)
        }}/>
        <select onChange={e => {
          setTossRes(e.target.value)
        }}>
          <option value="heads">Heads</option>
          <option value="tails">Tails</option>
        </select>
        <button onClick={_stakeBBQ}>Stake BBQ Coins</button>
        <button>Claim Rewards</button>
      </div>
      <p className={styles.rewardVal}>You will get some tokens ...</p>
    </div>
  );
}

export default TossCoin;