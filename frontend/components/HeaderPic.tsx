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
      <p className={styles.headtxt}>オンラインで文化祭を楽しもう</p>
    </div>
  )
}
