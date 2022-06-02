var CameraMovement = pc.createScript('cameraMovement');

CameraMovement.attributes.add('mouseSpeed', { type: 'number', default: 3.0, description: 'Mouse Sensitivity' });
CameraMovement.attributes.add('touchSpeed', { type: 'number', default: 10, description: 'Touch Sensitivity' });

// Called once after all resources are loaded and before the first update
CameraMovement.prototype.initialize = function () {
    this.eulers = new pc.Vec3();
    this.touchCoords = new pc.Vec2();
    this.lastTouchPoint = new pc.Vec2();
    
    var app = this.app;
    app.mouse.on("mousemove", this.onMouseMove, this);
    app.mouse.on("mouseup", this.onMouseUp, this);
    app.mouse.on("mousedown", this.onMouseDown, this);
    
    // タッチを追加
    if(app.touch){
        app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);        
    }

    this.rayEnd = app.root.findByName('RaycastEndPoint');
    
    this.on('destroy', function() {
        app.mouse.off("mousemove", this.onMouseMove, this);
        app.mouse.off("mouseup", this.onMouseUp, this);
        app.mouse.off("mousedown", this.onMouseDown, this);
        app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        app.touch.off(pc.EVENT_TOUCHEND, this.onTouchEnd, this);                
    }, this);
};

let mouseDown = false;
let touced = false;

CameraMovement.prototype.postUpdate = function (dt) {
    var originEntity = this.entity.parent;
    
    var targetY = this.eulers.x + 180;
    var targetX = this.eulers.y;

    var targetAng = new pc.Vec3(-targetX, targetY, 0);
    
    originEntity.setEulerAngles(targetAng);
                   
    this.entity.setPosition(this.getWorldPoint());
    
    this.entity.lookAt(originEntity.getPosition());
};

CameraMovement.prototype.onMouseMove = function (e) {
    if (mouseDown === true/*c.Mouse.isPointerLocked()*/) {
        this.eulers.x -= ((this.mouseSpeed * e.dx) / 60) % 360;
        this.eulers.y += ((this.mouseSpeed * e.dy) / 60) % 360;

        if (this.eulers.x < 0) this.eulers.x += 360;
        if (this.eulers.y < 0) this.eulers.y += 360;
    }
};
CameraMovement.prototype.onTouchMove = function (e) {
    if (touched === true/*c.Mouse.isPointerLocked()*/) {
        this.eulers.x -= ((this.touchSpeed * (e.touches[0].x - this.lastTouchPoint.x)) / 60) % 360;
        this.eulers.y += ((this.touchSpeed * (e.touches[0].y - this.lastTouchPoint.y)) / 60) % 360;

        if (this.eulers.x < 0) this.eulers.x += 360;
        if (this.eulers.y < 0) this.eulers.y += 360;
        
        this.lastTouchPoint.set(e.touches[0].x, e.touches[0].y);
    }
};


CameraMovement.prototype.onMouseDown = function (e) {
    // this.app.mouse.enablePointerLock();
    mouseDown = true;
};
CameraMovement.prototype.onMouseUp = function (e) {
    // this.app.mouse.enablePointerLock();
    mouseDown = false;
};
CameraMovement.prototype.onTouchStart = function (e) {
    // this.app.mouse.enablePointerLock();
    touched = true;
    this.lastTouchPoint.set(e.touches[0].x, e.touches[0].y);
};
CameraMovement.prototype.onTouchEnd = function (e) {
    // this.app.mouse.enablePointerLock();
    touched = false;
};


CameraMovement.prototype.getWorldPoint = function () {
    var from = this.entity.parent.getPosition(); 
    var to = this.rayEnd.getPosition();

    var hitPoint = to;

    var app = this.app;
    var hit = app.systems.rigidbody.raycastFirst(from, to);
    
    return hit ? hit.point : to;
};

