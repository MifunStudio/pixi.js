var core = require('../core'),
    DisplayObject = core.DisplayObject,
    Event = require('./Event');

Object.defineProperties(DisplayObject.prototype, {
    bubbleParent: {
        get: function() {
            return this.parent;
        }
    }
});

DisplayObject.prototype.displayObjectEmit = DisplayObject.prototype.emit;
DisplayObject.prototype.emit = function(type, evt) {
    if(evt && (evt instanceof Event) && evt.bubbles) {
        if(evt.isStopPropagation()) {
            return;
        }
        evt.setCurrentTarget(this);
        this.displayObjectEmit(type, evt);
        var bubbleParent = this.bubbleParent;
        if(bubbleParent) {
            bubbleParent.emit(type, evt);
        }
    } else {
        this.displayObjectEmit.apply(this, arguments);
    }
};

DisplayObject.prototype.emitEvent = function(type, bubbles, data) {
    var event = new Event(type, bubbles, data);
    this.emit(type, event);
};
