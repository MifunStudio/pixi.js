var core = require('../../core'),
    Sprite = core.Sprite,
    DnDEvent = require('./DnDEvent');

function DragHandler(dndManager, source) {
    this.dndManager = dndManager;
    this.source = source;
    this.dragging = false;
}

DragHandler.prototype.init = function() {
    this.source.on('panstart', this.onPanStart, this);
    this.source.on('panmove', this.onPanMove, this);
    this.source.on('panend', this.onPanEnd, this);
    this.source.on('pancancel', this.onPanCancel, this);
};

DragHandler.prototype.destroy = function() {
    this.source.off('panstart', this.onPanStart, this);
    this.source.off('panmove', this.onPanMove, this);
    this.source.off('panend', this.onPanEnd, this);
    this.source.off('pancancel', this.onPanCancel, this);
};

DragHandler.prototype.onPanStart = function(e) {
    var dndEvent = new DnDEvent('drag', e);
    this.source.onDragStart(dndEvent);
    if(dndEvent.canceled) {
        this.onDragDropEnd();
        return;
    }
    this.dragging = true;
    this.dragEvent = dndEvent;
    this.dragImage = dndEvent.dragImage;
    if(!this.dragImage) {
        var texture = this.source.generateTexture(
            this.dndManager.stage.renderer, 1);
        this.dragImage = new Sprite(texture);
        this.dragImage.alpha = 0.6;
        this.dragImage.scale.set(1.2);
        this.dragImage.anchor.set(0.5);
        this.dragEvent.setDragImage(this.dragImage);
        this.dndManager.stage.addChild(this.dragImage);
        this.updateDragImageXY(e.x, e.y);
    }
};

DragHandler.prototype.onPanMove = function(e) {
    if(!this.dragging) return;
    this.updateDragImageXY(e.x, e.y);
    var dndEvent = new DnDEvent('dragmove', e);
    this.source.onDragMove(dndEvent);
    if(dndEvent.canceled) {
        this.onDragDropEnd();
        return;
    }

    for(var key in this.dndManager._targetMap) {
        var targetHandler = this.dndManager._targetMap[key];
        var dndEvent = new DnDEvent('dropmove', e);
        dndEvent.setData(this.dragEvent.data);
        targetHandler.onDropMove(dndEvent);
    }
};

DragHandler.prototype.onPanEnd = function(e) {
    if(!this.dragging) return;
    this.updateDragImageXY(e.x, e.y);
    for(var key in this.dndManager._targetMap) {
        var targetHandler = this.dndManager._targetMap[key];
        var dndEvent = new DnDEvent('drop', e);
        dndEvent.setData(this.dragEvent.data);
        targetHandler.onDrop(dndEvent);
    }
    this.onDragDropEnd();
};

DragHandler.prototype.onPanCancel = function() {
    if(!this.dragging) return;
    this.onDragDropEnd();
};

DragHandler.prototype.onDragDropEnd = function() {
    for(var key in this.dndManager._targetMap) {
        var targetHandler = this.dndManager._targetMap[key];
        targetHandler.onDragDropEnd();
    }
    this.dragging = false;
    this.dndManager.stage.removeChild(this.dragImage);
    this.dragImage.texture.destroy(true);
    this.dragImage.destroy();
    this.dragImage = null;
    this.dragEvent = null;
};

DragHandler.prototype.updateDragImageXY = function(x, y) {
    this.dragImage.position.set(x, y);
};

module.exports = DragHandler;
