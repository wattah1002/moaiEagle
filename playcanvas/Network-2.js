var Network = pc.createScript('network');

Network.id = null;
Network.socket = null;

let cacheBoardText;

// Network.attributes.add('img', {type: 'asset'});

// initialize code called once per entity
Network.prototype.initialize = function() {
    this.player = this.app.root.findByName('Player');
    this.other = this.app.root.findByName('Other');
    this.boardText = this.app.root.findByName('boardText');
    this.boardImg = this.app.root.findByName('BoardImage');
    var app = this.app;
    let camera = app.root.findByName('Camera');
    this.cameraScript = camera.script.cameraMovement;
    
    // var socket = io.connect('34.201.199.8'); // 本番環境
    var socket = io.connect('https://moaieagle-socket.com:3000/'); // 本番環境
    console.log(socket);
    // var socket = io.connect('http://localhost:3000/');
    Network.socket = socket;
    socket.emit('initialize');
    
    
    var self = this;
    socket.on('playerData', function(data) {
        console.log('Connected.');
        self.initializePlayers(data);
    });
    
    socket.on('playerJoined', function(data){
        self.addPlayer(data);
    });

    socket.on('playerLeaved', function(id){
        self.removePlayer(id);
    });
    
    socket.on('playerMoved', function(data) {
        self.movePlayer(data);
    });
    
    socket.on('loadText', function(data) { //add
        self.loadText(data);
    });
    socket.on('boardTextChanged', function(data) {
        self.boardTextChanged(data);
    });
    
    socket.on('displayMessage', function(data) {
        self.displayMessage(data);
    });

    socket.on('NameUpdate', function(data) {
        self.updateName(data);
    });
    socket.on('loadImg', function(data) {
        self.loadImg(data);
    });
};

Network.prototype.initializePlayers = function(data) {
    this.players = data.players;
    Network.id = data.id;
    for(let key in this.players){ // 自分以外のentityを作成
        if(this.players[key].id != Network.id) {
            this.players[key].entity = this.createPlayerEntity(this.players[key]);
        }
    }
    
    this.initialized = true;
    console.log('initialized');
};

Network.prototype.createPlayerEntity = function(data){
    var newPlayer = this.other.clone();
    newPlayer.enabled = true;
    this.other.getParent().addChild(newPlayer);
    if(data) {
        newPlayer.rigidbody.teleport(data.x, data.y, data.z);
        newPlayer.children[1].element.text = data.name; // 自分以外のキャラの名前設定
    }
    return newPlayer;
};

Network.prototype.addPlayer = function(data) {
    this.players[data.id] = data;
    this.players[data.id].entity = this.createPlayerEntity();
};

Network.prototype.removePlayer = function(id) {
    this.players[id].entity.destroy();
    delete this.players[id];
};

Network.prototype.movePlayer = function(data){
    if(this.initialized){
        if(this.players[data.id].entity){
            // console.log(data.ry);
            // this.players[data.id].entity.rigidbody.teleport(data.x, data.y, data.z, data.rx, data.ry, data.rz);
            var pos = new pc.Vec3(data.x, data.y, data.z);
            var rot = new pc.Vec3(0, data.ry*180, 0);
            this.players[data.id].entity.rigidbody.teleport(pos, rot);
            var name_pos = new pc.Vec3(data.x, data.y+1.05, data.z);
            var chat_pos = new pc.Vec3(data.x, data.y+1.3, data.z);
            var name_chat_rot = new pc.Vec3(0, this.players[Network.id].ry, 0);
            // console.log(this.players[data.id].entity.children[2]);
            // console.log(this.players[Network.id].ry);
            this.players[data.id].entity.children[1].rigidbody.teleport(name_pos, name_chat_rot);
            this.players[data.id].entity.children[2].rigidbody.teleport(chat_pos, name_chat_rot);
        }
    }
};

// update code called every frame
Network.prototype.update = function(dt) {
    this.updatePosition();
    this.updateBoardText();
    // this.updateBoardImg();
};

Network.prototype.updatePosition = function(){
    if(this.initialized) {
        var pos = this.player.getPosition();
        let rot = this.player.getRotation();
        var targetY = this.cameraScript.eulers.x + 180;
        // this.players[Network.id].ry = rot.y;
        this.players[Network.id].ry = targetY;
        // console.log(rot);
        Network.socket.emit('positionUpdate', {id: Network.id, x: pos.x, y: pos.y, z: pos.z, rx: rot.x, ry: rot.y, rz: rot.z});
        // Network.socket.emit('positionUpdate', {id: Network.id, x: pos.x, y: pos.y, z: pos.z, rx: 0, ry: targetY, rz: 0});
    }
};

Network.prototype.loadText = function(data){
    this.boardText.element.text = data;
    cacheBoardText = data;
};

Network.prototype.updateBoardText = function(){
  if(this.initialized && this.boardText.element.text !== cacheBoardText) {
      var newBoardText = this.boardText.element.text;
      Network.socket.emit('boardTextUpdate', newBoardText);
      console.log('Board text updated.');
      cacheBoardText = newBoardText;
  }  
};

Network.prototype.boardTextChanged = function(data) {
    if(this.initialized) {
        this.boardText.element.text = data;
        console.log('receive board text data');
        cacheBoardText = data;
    }
};


Network.prototype.broadSetName = function(name) {
    this.players[Network.id].name = name;
    Network.socket.emit('broadSetName', name);
    // console.log(name);
};

Network.prototype.updateName = function(data) {
    this.players[data.id].name = data.name;

    if(this.initialized){
        if(this.players[data.id].entity){
            // console.log(this.players[data.id].entity);
            this.players[data.id].entity.children[1].element.text = data.name;
        }
    }
};

Network.prototype.broadTalk = function(data) {
    // this.players[Network.id].name = name;
    Network.socket.emit('broadTalk', data);
    // console.log(name);
};

// let textTimer = null;
Network.prototype.displayMessage = function(data) {
    // console.log(data.id, data.message);
    if(this.initialized){
        if(this.players[data.id].entity){
            this.players[data.id].entity.children[2].enabled = true; // キャラ上のチャット背景を表示;
            this.players[data.id].entity.children[2].children[1].element.text = data.message; // キャラ上のチャットを更新;
            window.setTimeout(function() {
                this.players[data.id].entity.children[2].enabled = false; // 一定時間後キャラ上のチャットを非表示
            }.bind(this), 10000);
        }
    }
};

Network.prototype.loadImg = function(data) {
    var asset = new pc.Asset("boardImg", "texture", {
        url: data
    }); //アセットの定義
    this.app.assets.add(asset); //アセットに追加
    this.boardImg.element.textureAsset = asset; //エレメントに追加
    console.log(asset.file.url);
};

Network.prototype.updateBoardImg = function(data){
      Network.socket.emit('boardImgUpdate', data);
};

// Network.prototype.boardImgChanged = function(data) {
//     if(this.initialized) {
//         var asset = new pc.Asset("boardImg", "texture", {
//             url: data
//         }); //アセットの定義
//         this.app.assets.add(asset); //アセットに追加
//         this.boardImg.element.textureAsset = asset; //エレメントに追加
//         console.log('receive board text data');
//     }
// };