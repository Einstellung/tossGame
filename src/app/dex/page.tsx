import styles from "./style.module.scss"

function Exchange() {
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

      <div className={styles.actions}>
        <div className={styles.liquidityStyle}>
          <div className={styles.liqui}>
            <div className={styles.optionContainer}>
              <input type="number" className={styles.numberInput} />
              <button className={styles.button}>Add liquidity</button>
            </div>
            <p className={styles.inputResult}>You will need some ... tokens</p>
          </div>
          <div className={styles.liqui}>
            <div className={styles.optionContainer}>
              <input type="number" className={styles.numberInput} />
              <button className={styles.button}>Remove liquidity</button>
            </div>
            <p className={styles.inputResult}>You will get some ... tokens</p>
          </div>
        </div>


        <br />
        <br />
        <div className={styles.optionContainer}>
          <input type="number" className={styles.numberInput} />
          <select name="dropdown" id="dropdown" className={styles.select}>
            <option value="eth">Ethereum</option>
            <option value="barbecueToken">Barbecue Token</option>
          </select>
          <button className={styles.button}>Swap</button>
        </div>
        <p className={styles.inputResult}>You will get some ... tokens</p>
      </div>
    </div>
  );
}

export default Exchange
