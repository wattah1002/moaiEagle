import * as React from 'react';
import Image from 'next/image'
import Box from "@material-ui/core/Box";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from "@material-ui/core/Grid";
import headPic from '../public/sample.jpg'
import styles from "./CardBlock.module.css";

export default function Home() {
  return (
    <div >
        <Grid container>
            <Grid item xs={6} className={styles.parent}>
                <Box
                    sx={{
                        // width: 300,
                        height: 300,
                        bgcolor: 'primary.main',
                    }}
                    className={styles.child}
                />
                <p className={styles.cardtext}>text</p>
            </Grid>
            <Grid item xs={6}>
                <Image
                    // width={500}
                    height={400}
                    // layout="responsive"
                    // className={styles.card}
                    src={headPic}
                    alt="HeadPicture"
                />
            </Grid>

            <Grid item xs={6}>
                <Box
                    sx={{
                        // width: 300,
                        height: 300,
                        bgcolor: 'primary.main',
                    }}
                >
                    text
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Image
                    // width={500}
                    height={400}
                    // layout="responsive"
                    // className={styles.card}
                    src={headPic}
                    alt="HeadPicture"
                />
            </Grid>

        </Grid>

    </div>
  )
}
