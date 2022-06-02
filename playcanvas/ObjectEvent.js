var ObjectEvent = pc.createScript('objectEvent');
ObjectEvent.attributes.add('BoardImage', { type: 'entity'});
ObjectEvent.attributes.add("Root", {type:"entity"});

let isOpenBoardWindow = false;
let imageUrl = null;

ObjectEvent.attributes.add("css", {
  type: "asset",
  assetType: "css",
  title: "CSS Asset"
});
ObjectEvent.attributes.add("html", {
  type: "asset",
  assetType: "html",
  title: "HTML Asset"
});

// initialize code called once per entity
ObjectEvent.prototype.initialize = function() {
    self.GameScreen = this.app.root.findByName('GameScreen');

    const head = document.getElementsByTagName("head")[0];
    const style = `<style>${this.css.resource}</style>`;
    head.insertAdjacentHTML("beforeend", style);

    self.NetworkScript = this.Root.script.get(Network); // Network.jsのscriptを保持

    this.BoardImage.element.on(pc.EVENT_MOUSEDOWN, this.targetBoardImage, this);
};

// update code called every frame
ObjectEvent.prototype.update = function(dt) {
    
};

ObjectEvent.prototype.targetBoardImage = function(event) {
    // console.log("yeah");

    if(!isOpenBoardWindow){
        self.GameScreen.children[0].enabled = false; // HintButtonを非表示
        self.GameScreen.children[1].enabled = false; // ChatButtonを非表示

        // htmlとcssをbodyの下に追加
        const body = document.getElementsByTagName("body")[0];
        body.insertAdjacentHTML("beforeend", this.html.resource);

        self.closeButtonElement = document.getElementById("closeButton");
        self.setImageButtonElement = document.getElementById("setImageButton");
        self.uploadElement = document.getElementById("uploadBox");

        self.closeButtonElement.addEventListener("click", event => {
            self.paElement = document.getElementById("bg");
            document.body.removeChild(self.paElement); // 親要素ごと削除
            self.GameScreen.children[0].enabled = true; // HintButtonを表示
            self.GameScreen.children[1].enabled = true; // ChatButtonを表示
            console.log("キャンセル");
        });
        self.setImageButtonElement.addEventListener("click", event => {
            if(imageUrl){
                self.paElement = document.getElementById("bg");
                document.body.removeChild(self.paElement); // 親要素ごと削除
                self.GameScreen.children[0].enabled = true; // HintButtonを表示
                self.GameScreen.children[1].enabled = true; // ChatButtonを表示
                self.NetworkScript.loadImg(imageUrl); // 自分の画面の画像を更新
                self.NetworkScript.updateBoardImg(imageUrl); // 自分以外の画面の画像を更新するようにbroadcast
                console.log("決定！");
            }
        });

        self.uploadElement.addEventListener("change", event => {
            const files = self.uploadElement.files[0];

            const preview = document.getElementById('preview');
            // FileReaderオブジェクトを作成
            const reader = new FileReader();
            // ファイルが読み込まれたときに実行する
            reader.onload = function (e) {
                imageUrl = e.target.result; // 画像のURLはevent.target.resultで呼び出せる
                console.log("aaaaa", imageUrl);
                const img = document.createElement("img"); // img要素を作成
                img.style.height = "300px";
                img.src = imageUrl; // 画像のURLをimg要素にセット
                preview.appendChild(img); // #previewの中に追加
                // console.log(imageUrl);
                // self.NetworkScript.loadImg(imageUrl);
                // self.NetworkScript.updateBoardImg(imageUrl);
            };
            reader.readAsDataURL(files);

        });
    }
};