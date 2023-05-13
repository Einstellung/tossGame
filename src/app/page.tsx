"use client";
import styles from './page.module.css'
import { usePathname } from 'next/navigation';

export default function Home() {

  const pathname = usePathname();

  console.log("home page rendered")

  return (
    <main className={styles.main}>
      {/* without too much avail, In the future can use pathname == "/dex", render root page with dex */}
      {/* {
        pathname === "/ico" && <ICO></ICO>
      }
     */}
    </main>
  )
}
