import Head from 'next/head'
import Iframe from 'react-iframe'

import Header from "../components/Header";
import Footer from "../components/Footer";



export default function Home() {

  function postHello() {
    const ifr = document.getElementById("game-iframe");
    ifr.contentWindow.postMessage("hello", "https://playcanv.as/");
  }

//   document.querySelector("#post-message").addEventListener("submit", (e)=>{
//     // 規定の送信処理をキャンセル(画面遷移しないなど)
//     e.preventDefault();

//     // 入力されたroom名・名前を取得する
//     const message = document.querySelector("#msg");
//     if( message.value === "" ){
//         return(false);
//     }

//     message.value = "";

//     // document.querySelector("#msg").focus();
//   });


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
            // position='absolute'
            width='100%'
            height='500px'/>
          <form id="post-message">
            <input type="text" id="msg"/>
            <button id="submit">送信</button>
          </form>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
