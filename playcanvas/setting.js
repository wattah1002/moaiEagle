var Setting = pc.createScript('setting');

// initialize code called once per entity
Setting.prototype.initialize = function() {
    // 長押ししても，右クリックメニューが表示されないようにする
    document.body.style.setProperty('-webkit-touch-callout', 'none');
    document.body.style.setProperty('-webkit-user-select', 'none');
    document.body.setAttribute("oncontextmenu","return false;");
};

// update code called every frame
Setting.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// Setting.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/