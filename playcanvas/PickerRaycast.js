// エンティティのクリック判定をするためのコード
// クラス番号の掲示板をクリックするとテキストボックスを表示したい
// 引用リンク
// https://developer.playcanvas.com/ja/tutorials/entity-picking/
var PickerRaycast = pc.createScript('pickerRaycast');

PickerRaycast.attributes.add("board", {type:"entity"});

// initialize code called once per entity
PickerRaycast.prototype.initialize = function() {
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onSelect, this);
};

// update code called every frame
PickerRaycast.prototype.update = function(dt) {
    var from = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.nearClip);
    var to = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.farClip);

    var result = this.app.systems.rigidbody.raycastFirst(from, to);
    if (result) {
        console.log('board click');
    //if (result && result.entity === board) {
        
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// PickerRaycast.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/