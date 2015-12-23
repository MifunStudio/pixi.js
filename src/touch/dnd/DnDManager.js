var core = require('../../core'),
    DisplayObject = core.DisplayObject,
    DragHandler = require('./DragHandler'),
    DropHandler = require('./DropHandler');

var dndManager;

DisplayObject.prototype._draggable = false;
DisplayObject.prototype._droppable = false;

Object.defineProperties(DisplayObject.prototype, {
    draggable: {
        get: function() {
            return this._draggable;
        },
        set: function(value) {
            if(!dndManager) {
                throw new Error('drag and drop feature not enabled');
            }
            this._draggable = value;
            if(value) {
                dndManager.addSource(this);
            } else {
                dndManager.removeSource(this);
            }
        }
    },
    droppable: {
        get: function() {
            return this._droppable;
        },
        set: function(value) {
            if(!dndManager) {
                throw new Error('drag and drop feature not enabled');
            }
            this._droppable = value;
            if(value) {
                dndManager.addTarget(this);
            } else {
                dndManager.removeTarget(this);
            }
        }
    }
});

DisplayObject.prototype.onDragStart = function(e) {
    return e;
};

DisplayObject.prototype.onDragMove = function(e) {
    return e;
};

DisplayObject.prototype.onDropMove = function(e) {
    return e;
};

DisplayObject.prototype.onDrop = function(e) {
    return e;
};

DisplayObject.prototype.onDragDropEnd = function() {
    return;
};

function DnDManager(stage) {
    dndManager = this;
    this._stage = stage;
    this._sourceMap = {};
    this._targetMap = {};
}

Object.defineProperties(DnDManager.prototype, {
    stage: {
        get: function() {
            return this._stage;
        }
    }
});

DnDManager.prototype.addSource = function(source) {
    var handler = this._sourceMap[source.hashCode];
    if(handler) {
        return;
    }
    handler = new DragHandler(this, source);
    handler.init();
    this._sourceMap[source.hashCode] = handler;
};

DnDManager.prototype.removeSource = function(source) {
    var handler = this._sourceMap[source.hashCode];
    if(!handler) {
        return;
    }
    handler.destroy();
    delete this._sourceMap[source.hashCode];
};

DnDManager.prototype.addTarget = function(target) {
    var handler = this._targetMap[target.hashCode];
    if(handler) {
        return;
    }
    handler = new DropHandler(this, target);
    handler.init();
    this._targetMap[target.hashCode] = handler;
};

DnDManager.prototype.removeTarget = function(target) {
    var handler = this._targetMap[target.hashCode];
    if(!handler) {
        return;
    }
    handler.destroy();
    delete this._targetMap[target.hashCode];
};

module.exports = DnDManager;
