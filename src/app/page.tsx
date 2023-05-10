"use client";
import styles from './page.module.css'
import React, { Suspense } from 'react'
import Link from 'next/link'


export default function Home({children}: {
  children?: React.ReactNode
}) {

  return (
    <main className={styles.main}>

      {/* {renderComponent()} */}
      {children}
      <div className={styles.grid}>
        <Link href="/nft" className={styles.card}>
          <h2>
            Mint NFT <span>-&gt;</span>
          </h2>
          <p>Mint NFT to get Barbecure token in discount price</p>
        </Link>

        <Link href="/ico" className={styles.card}>
          <h2>
            Token ICO <span>-&gt;</span>
          </h2>
          <p>Buy token using goerli eth</p>
        </Link>

        <Link href="/dex" className={styles.card}>
          <h2>
            DEX <span>-&gt;</span>
          </h2>
          <p>Decentralize exchange use Uniswap V1 AMM mechanism</p>
        </Link>

      </div>
    </main>
  )
}
