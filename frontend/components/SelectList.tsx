import * as React from 'react';
import styles from "./SelectList.module.css";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Image from 'next/image'
import headPic from '../public/sample.jpg'

export default function Home() {
  return (
    <div >
        <div className={styles.message}>現在はログインなしでご利用いただけます</div>
        <div className={styles.topLine}>参加可能な学校</div>
          <Grid container>
              <Grid item xs={4} className={styles.cardImageParent}>
                  <Image
                      layout="fill"
                      objectFit={"cover"}
                      src={headPic}
                      alt="HeadPicture"
                  />
              </Grid>
              <Grid item xs={8} className={styles.cartTextParent}>
                  <div className={styles.cardTextBg}>
                      <div className={styles.cardTextChild}>
                          <p className={styles.cardTextTitle}>〇〇高等学校</p>
                          <Link href="./world">
                            <span className={styles.cardTextButton1}>編集者として参加</span>
                          </Link>
                          <Link href="./world">
                            <span className={styles.cardTextButton2}>一般参加</span>
                          </Link>
                      </div>
                  </div>
              </Grid>
          </Grid>
    </div>
  )
}
