var InitInputName = pc.createScript('initInputName');

// プレイヤー上の名前Entityを設定
InitInputName.attributes.add("PlayerName", {type:"entity"});
InitInputName.attributes.add("Player", {type:"entity"});
InitInputName.attributes.add("Root", {type:"entity"});
InitInputName.attributes.add("GameScreen", {type:"entity"});

InitInputName.attributes.add("css", {
  type: "asset",
  assetType: "css",
  title: "CSS Asset"
});
InitInputName.attributes.add("html", {
  type: "asset",
  assetType: "html",
  title: "HTML Asset"
});

// initialize code called once per entity
InitInputName.prototype.initialize = function() {
    let self = this;

    self.NetworkScript = this.Root.script.get(Network); // Network.jsのscriptを保持
    self.PlayerScript = this.Player.script.get(PlayerMovement); // PlayerMovement.jsのscriptを保持

    // htmlとcssをbodyの下に追加
    const body = document.getElementsByTagName("body")[0];
    const head = document.getElementsByTagName("head")[0];
    const style = `<style>${this.css.resource}</style>`;
    body.insertAdjacentHTML("beforeend", this.html.resource);
    head.insertAdjacentHTML("beforeend", style);

    // inputにfocusしてキー入力を処理
    self.inputElement = document.getElementById("inputBox");
    self.inputElement.focus();
    // console.log("aaa", self.inputElement);
    self.inputElement.addEventListener("keydown", event => {
        if(event.keyCode == 13){
            self.setName(this.inputElement.value);
            // this.inputElement.value = "";
            // document.body.removeChild(self.background);
            document.body.removeChild(self.inputElement.parentElement); // 親要素ごと削除
        }
    });

};

// update code called every frame
InitInputName.prototype.update = function(dt) {
    
};

InitInputName.prototype.setName = function(name) {
    let self = this;

    if(this.PlayerName){ // この行はいるのかどうか
        this.PlayerName.element.text = name;
        this.PlayerName.element.color = new pc.Color(1, 0.5, 0.5); // 自分の名前の色を設定
    }
    self.NetworkScript.broadSetName(name);
    self.PlayerScript.switchIsOperation();
    
    self.GameScreen.children[0].enabled = true; // HintButtonを表示
    self.GameScreen.children[1].enabled = true; // ChatButtonを表示

};

// swap method called for script hot-reloading
// inherit your script state here
// InitInputName.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/