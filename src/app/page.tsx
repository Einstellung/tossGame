"use client";
import styles from './page.module.css'
import { usePathname } from 'next/navigation';
import TossCoin from './toss/page';

export default function Home() {

  const pathname = usePathname();

  return (
    <main className={styles.main}>
      {
        pathname === "/" && <TossCoin></TossCoin>
      }
    </main>
  )
}
