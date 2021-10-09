import * as React from 'react';
import Image from 'next/image'
import headPic from '../public/headerimage.png'
import styles from "./HeaderPic.module.css";

export default function Home() {
  return (
    <div className={styles.headpic}>
      <Image
        width={1000}
        height={563}
        layout="responsive"
        src={headPic}
        alt="HeadPicture"
      />
      <div className={styles.headtxt}>
        {/* <p className={styles.headtxtChild}>文化祭を</p>
        <p className={styles.headtxtChild}>オンラインで</p> */}
        <p className={styles.headtxtChild}>文化祭をオンラインで</p>
      </div>
    </div>
  )
}
