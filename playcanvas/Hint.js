let Hint = pc.createScript('Hint');

// Elementでテキストを表示しているEntity
Hint.attributes.add("HintButton", {type:"entity"});
Hint.attributes.add("Root", {type:"entity"});
Hint.attributes.add("image", {"type": "asset"});

Hint.attributes.add("css", {
  type: "asset",
  assetType: "css",
  title: "CSS Asset"
});
Hint.attributes.add("html", {
  type: "asset",
  assetType: "html",
  title: "HTML Asset"
});

Hint.prototype.initialize = function() {
    let self = this;
    
    self.NetworkScript = this.Root.script.get(Network); // Network.jsのscriptを保持
    var Player = this.app.root.findByName('Player');
    self.GameScreen = this.app.root.findByName('GameScreen');
    self.PlayerScript = Player.script.get(PlayerMovement); // PlayerMovement.jsのscriptを保持


    // htmlとcssをbodyの下に追加
    const head = document.getElementsByTagName("head")[0];
    const style = `<style>${this.css.resource}</style>`;
    head.insertAdjacentHTML("beforeend", style);

    // chatボタンがクリックされたら
    this.HintButton.element.on('click', this.targetHintButton, this);    
};

Hint.prototype.targetHintButton = function() {
    let self = this;

    self.PlayerScript.switchIsOperation();
    self.GameScreen.children[0].enabled = false; // HintButtonを非表示
    self.GameScreen.children[1].enabled = false; // ChatButtonを非表示

    // htmlとcssをbodyの下に追加
    const body = document.getElementsByTagName("body")[0];
    body.insertAdjacentHTML("beforeend", this.html.resource);

    let img = document.getElementById("manualImg");
    console.log(this.image);
    img.src = this.image.getFileUrl();
    
    self.manualCloseElement = document.getElementById("manualClose");
    self.manualCloseElement.addEventListener("click", event => {
        self.PlayerScript.switchIsOperation();
        self.paElement = document.getElementById("bg");
        document.body.removeChild(self.paElement); // 親要素ごと削除
        self.GameScreen.children[0].enabled = true; // HintButtonを表示
        self.GameScreen.children[1].enabled = true; // ChatButtonを表示
        console.log("キャンセル");
    });

};