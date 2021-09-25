import * as React from 'react';
import styles from "./JoinButton.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div >
        <Link href="./selectschool">
          <div className={styles.joinButton}>実際に体験する</div>
        </Link>
    </div>
  )
}
