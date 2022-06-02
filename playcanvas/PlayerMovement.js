var PlayerMovement = pc.createScript('playerMovement');
PlayerMovement.attributes.add('speed', { type: 'number', default: 0.09 });

let isOperation = false; // プレイヤー操作ができるか否か(初期状態はfalse.名前を入れるとtrueになる)

// タッチボタンのentity設定
PlayerMovement.attributes.add("btnUp",{type: "entity"});
PlayerMovement.attributes.add("btnLeft",{type: "entity"});
PlayerMovement.attributes.add("btnDown",{type: "entity"});
PlayerMovement.attributes.add("btnRight",{type: "entity"});

//　各ボタンがタッチされてるかのbool変数
let upTouched = false;
let leftTouched = false;
let downTouched = false;
let rightTouched = false;

PlayerMovement.prototype.initialize = function () {
    var app = this.app;
    var camera = app.root.findByName('Camera');
    this.cameraScript = camera.script.cameraMovement;
    
    // ゲームパッド非表示
    this.btnUp.enabled = false;
    this.btnLeft.enabled = false;
    this.btnDown.enabled = false;
    this.btnRight.enabled = false;    

    if(app.touch){
        // タッチができるデバイスに限り，ゲームパッドを表示
        this.btnUp.enabled = true;
        this.btnLeft.enabled = true;
        this.btnDown.enabled = true;
        this.btnRight.enabled = true;
        
        // タッチイベントの発火設定
        this.btnUp.button.on('touchstart', this._upBtnTouchStart, this);
        this.btnUp.button.on('touchend', this._upBtnTouchEnd, this);
        this.btnLeft.button.on('touchstart', this._leftBtnTouchStart, this);
        this.btnLeft.button.on('touchend', this._leftBtnTouchEnd, this);
        this.btnDown.button.on('touchstart', this._downBtnTouchStart, this);
        this.btnDown.button.on('touchend', this._downBtnTouchEnd, this);
        this.btnRight.button.on('touchstart', this._rightBtnTouchStart, this);
        this.btnRight.button.on('touchend', this._rightBtnTouchEnd, this);        
    }
};

// 各ボタンの発火の有無
PlayerMovement.prototype._upBtnTouchStart = function() {
    upTouched = true;
};
PlayerMovement.prototype._upBtnTouchEnd = function() {
    upTouched = false;
};
PlayerMovement.prototype._leftBtnTouchStart = function() {
    leftTouched = true;
};
PlayerMovement.prototype._leftBtnTouchEnd = function() {
    leftTouched = false;
};
PlayerMovement.prototype._downBtnTouchStart = function() {
    downTouched = true;
};
PlayerMovement.prototype._downBtnTouchEnd = function() {
    downTouched = false;
};
PlayerMovement.prototype._rightBtnTouchStart = function() {
    rightTouched = true;
};
PlayerMovement.prototype._rightBtnTouchEnd = function() {
    rightTouched = false;
};

// Temp variable to avoid garbarge colleciton
PlayerMovement.worldDirection = new pc.Vec3();
PlayerMovement.tempDirection = new pc.Vec3();

PlayerMovement.prototype.update = function (dt) {
    var app = this.app;
    var worldDirection = PlayerMovement.worldDirection;
    worldDirection.set(0, 0, 0);
    
    var tempDirection = PlayerMovement.tempDirection;
    
    var forward = this.entity.forward;
    var right = this.entity.right;

    var x = 0;
    var z = 0; 
    
    
    if (isOperation && (app.keyboard.isPressed(pc.KEY_A) || leftTouched === true) ) {
        x -= 1;
    }

    if (isOperation && (app.keyboard.isPressed(pc.KEY_D) || rightTouched === true) ) {
        x += 1;
    }

    if (isOperation && (app.keyboard.isPressed(pc.KEY_W) || upTouched === true) ) {
        z += 1;
    }

    if (isOperation && (app.keyboard.isPressed(pc.KEY_S) || downTouched === true) ) {
        z -= 1;
    }

    if (isOperation && (x !== 0 || z !== 0)) {
        worldDirection.add(tempDirection.copy(forward).mulScalar(z));
        worldDirection.add(tempDirection.copy(right).mulScalar(x));        
        worldDirection.normalize();
        
        var pos = new pc.Vec3(worldDirection.x * dt, 0, worldDirection.z * dt);
        pos.normalize().scale(this.speed);
        pos.add(this.entity.getPosition());

        var targetY = this.cameraScript.eulers.x + 180;
        var rot = new pc.Vec3(0, targetY, 0);

        this.entity.rigidbody.teleport(pos, rot);
    }
    
    // this.entity.anim.setFloat('xDirection', x);
    // this.entity.anim.setFloat('zDirection', z);
    
    // console.log(this.entity.anim.getFloat('xDirection'), this.entity.anim.getFloat('zDirection'));
    // console.log(this.entity.anim.baseLayer.activeState);
};

PlayerMovement.prototype.switchIsOperation = function () {
    isOperation = !isOperation;
};