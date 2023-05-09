import Image from 'next/image'
import styles from './page.module.css'
import React from 'react'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <h2>Gold/USD forcast</h2>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="/nft"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Mint NFT <span>-&gt;</span>
          </h2>
          <p>Mint NFT to get Barbecure token in discount price</p>
        </a>

        <a
          href="/ico"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Token ICO <span>-&gt;</span>
          </h2>
          <p>Buy token using goerli eth</p>
        </a>

        <a
          href="/dex"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            DEX <span>-&gt;</span>
          </h2>
          <p>Decentralize exchange use Uniswap V1 AMM mechanism</p>
        </a>
      </div>
    </main>
  )
}
