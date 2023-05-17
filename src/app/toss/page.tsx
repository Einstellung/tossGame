import styles from './style.module.scss';

function TossCoin() {
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
        <select name="" id="">
          <option value="heads">Heads</option>
          <option value="tails">Tails</option>
        </select>
        <button>Stake BBQ Coins</button>
        <button>Claim Rewards</button>
      </div>
      <p className={styles.rewardVal}>You will get some tokens ...</p>
    </div>
  );
}

export default TossCoin;