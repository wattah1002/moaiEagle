let ChatMessage = pc.createScript('ChatMessage');

let isOpenChatWindow = false;

// 3Dのテキストを作るEntityを設定
ChatMessage.attributes.add("boardText", {type:"entity"});
// Elementでテキストを表示しているEntity
ChatMessage.attributes.add("chatText", {type:"entity"});
ChatMessage.attributes.add("ChatButton", {type:"entity"});
ChatMessage.attributes.add("Root", {type:"entity"});

ChatMessage.attributes.add("css", {
  type: "asset",
  assetType: "css",
  title: "CSS Asset"
});
ChatMessage.attributes.add("html", {
  type: "asset",
  assetType: "html",
  title: "HTML Asset"
});

ChatMessage.prototype.initialize = function() {
    let self = this;
    
    self.NetworkScript = this.Root.script.get(Network); // Network.jsのscriptを保持
    var Player = this.app.root.findByName('Player');
    self.GameScreen = this.app.root.findByName('GameScreen');
    self.PlayerScript = Player.script.get(PlayerMovement); // PlayerMovement.jsのscriptを保持

    // テキストを入力するためのinput要素を追加
    // self.inputElement = document.createElement("input");
    // self.inputElement.type = 'text';
    // self.inputElement.style.position = "fixed";
    // self.inputElement.style.bottom = 0;
    // self.inputElement.style.left = "40%";
    // self.inputElement.style.zIndex = 1;
    // self.inputElement.style.width = "500px";
    // self.inputElement.style.height = "50px";
    // self.inputElement.style.fontSize = "2rem";
    // self.inputElement.style.opacity = 0.5;
    // self.inputElement.style.cursor = "pointer";

    // document.body.appendChild(self.inputElement);

    // htmlとcssをbodyの下に追加
    const head = document.getElementsByTagName("head")[0];
    const style = `<style>${this.css.resource}</style>`;
    head.insertAdjacentHTML("beforeend", style);
    
    // クリックされたらinput要素にfocusする
    // self.entity.element.on(pc.EVENT_MOUSEDOWN, self.inputFocus, this); // chatTextにしかfocusしないのは何故？
    this.ChatButton.element.on('click', this.targetChatButton, this);

    // enterが押された時の処理
    // self.inputElement.addEventListener("keydown", event => {
    //     if(event.keyCode == 13){
    //         // console.log("enter");
    //         self.inputVal();
    //         this.inputElement.value = "";
    //     }
    //     // self.inputVal();
    // });
    // self.inputElement.addEventListener("keyup",function(){
    //     self.inputVal();
    // });

    
};

// ChatMessage.prototype.inputFocus = function() {
//     // input要素にfocusさせる

//     let self = this;
//     window.setTimeout(function() {
//         self.inputElement.focus();
//     }.bind(self), 90);

// };

ChatMessage.prototype.targetChatButton = function() {
    let self = this;

    if(!isOpenChatWindow){
        self.PlayerScript.switchIsOperation();
        isOpenChatWindow = !isOpenChatWindow;
        self.GameScreen.children[0].enabled = false; // HintButtonを非表示

        // htmlとcssをbodyの下に追加
        const body = document.getElementsByTagName("body")[0];
        body.insertAdjacentHTML("beforeend", this.html.resource);

        self.inputElement = document.getElementById("inputMessage");
        window.setTimeout(function() {
            self.inputElement.focus();
        }.bind(self), 90);
        self.inputElement.focus();

        self.inputElement.addEventListener("keydown", event => {
            if(event.keyCode == 13){
                // console.log("enter");
                self.inputVal(this.inputElement.value);
                // this.inputElement.value = "";
            }
            // self.inputVal();
        });
    }else{
        self.PlayerScript.switchIsOperation();
        isOpenChatWindow = !isOpenChatWindow;
        self.GameScreen.children[0].enabled = true; // HintButtonを表示
        self.inputElement = document.getElementById("inputMessage");
        document.body.removeChild(self.inputElement.parentElement); // 親要素ごと削除
    }

};

let textTimer = null;
ChatMessage.prototype.inputVal = function(data) {
    // input要素に入力されたテキストを textMesh.js の createText() で3D化

    let self = this;
    this.chatText._parent.enabled = true; // キャラ上のチャットを表示
    if(textTimer){
        clearTimeout(textTimer);
    }
    textTimer = window.setTimeout(function() {
        this.chatText._parent.enabled = false; // 一定時間後キャラ上のチャットを非表示
    }.bind(self), 10000);

    if(this.chatText){ // この行はいるのかどうか
        this.chatText.element.text = data; // キャラ上のチャットの文字を更新
    }

    self.NetworkScript.broadTalk(data);

    document.body.removeChild(self.inputElement.parentElement); // 親要素ごと削除
    self.PlayerScript.switchIsOperation();
    isOpenChatWindow = !isOpenChatWindow;
    self.GameScreen.children[0].enabled = true; // HintButtonを表示

    this.boardText.element.text = this.data;

};