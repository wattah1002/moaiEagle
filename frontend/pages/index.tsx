import Head from 'next/head'
import Iframe from 'react-iframe'

import Header from "../components/Header";
import Footer from "../components/Footer";



export default function Home() {

  function postHello() {
    const ifr = document.getElementById("game-iframe");
    ifr.contentWindow.postMessage("hello", "https://playcanv.as/");
  }

  return (
    <div>
      <Head>
        <title>ブンクラ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <button onClick={postHello}>
            send
          </button>
          <Iframe id = 'game-iframe'
            url = 'https://playcanv.as/e/p/Nxv2BY8h/'
            position='absolute'
            width='80%'
            height='90%'/>
      </main>
      <Footer />
    </div>
  )
}
