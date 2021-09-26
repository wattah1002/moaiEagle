import * as React from 'react';
import Image from 'next/image'
import Box from "@material-ui/core/Box";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from "@material-ui/core/Grid";
import step1 from '../public/step1.png';
import step2 from '../public/step2.png';
// import school from '../public/school.png';
import styles from "./CardBlock.module.css";

export default function Home() {
  return (
    <div >
        <div className={styles.cardLabel}>step1</div>
        <Grid container>
            <Grid item xs={6} className={styles.cartTextParent}>
                <div className={styles.cardTextBg}>
                    <div className={styles.cardTextChild}>
                        <p className={styles.cardTextTitle}>みんなで教室を装飾しよう</p>
                        <p className={styles.cardTextContent}>自分たちの教室に動画や画像を自由に展示できる！</p>
                    </div>
                </div>
            </Grid>
            <Grid item xs={6} className={styles.cardImageParent}>
                <Image
                    layout="fill"
                    objectFit={"cover"}
                    src={step1}
                    alt="HeadPicture"
                />
            </Grid>
        </Grid>

        <div className={styles.cardLabel}>step2</div>
        <Grid container>
            <Grid item xs={6} className={styles.cartTextParent}>
                <div className={styles.cardTextBg}>
                    <div className={styles.cardTextChild}>
                        <p className={styles.cardTextTitle}>みんなで文化祭を楽しもう</p>
                        <p className={styles.cardTextContent}>実際に装飾した教室を散策できる！</p>
                    </div>
                </div>
            </Grid>
            <Grid item xs={6} className={styles.cardImageParent}>
                <Image
                    layout="fill"
                    objectFit={"cover"}
                    src={step2}
                    alt="HeadPicture"
                />
            </Grid>
        </Grid>

    </div>
  )
}
