var CAPTURE = 1;
var BUBBLE = 2;
var TARGET = 3;

function Event(type, bubbles, data, canStopBubbles) {
    this._type = type;
    this._bubbles = bubbles;
    this._data = data;
    this._canStopBubbles = canStopBubbles;
    this._target = null;
    this._currentTarget = null;
    this._eventPhase = CAPTURE;
    this._immediatePropagationStoped = false;
    this._propagationStoped = false;
    this._listenerRemove = false;
}

Event.CAPTURE = CAPTURE;
Event.BUBBLE = BUBBLE;
Event.TARGET = TARGET;

Event.prototype.constructor = Event;

Object.defineProperties(Event.prototype, {
    type: {
        get: function() {
            return this._type;
        }
    },
    data: {
        get: function() {
            return this._data;
        }
    },
    target: {
        get: function() {
            return this._target;
        }
    },
    currentTarget: {
        get: function() {
            return this._currentTarget;
        }
    },
    eventPhase: {
        get: function() {
            return this._eventPhase;
        }
    },
    bubbles: {
        get: function() {
            return this._bubbles;
        }
    },
    canStopBubbles: {
        get: function() {
            return this._canStopBubbles;
        }
    }
});

Event.prototype.isStopPropagation = function() {
    return this._propagationStoped;
};

Event.prototype.stopPropagation = function() {
    if(!this._canStopBubbles) {
        return;
    }
    this._propagationStoped = true;
};

Event.prototype.isStopImmediatePropagation = function() {
    return this._immediatePropagationStoped;
};

Event.prototype.stopImmediatePropagation = function() {
    if(!this._canStopBubbles) {
        return;
    }
    this._immediatePropagationStoped = true;
    this._propagationStoped = true;
};

Event.prototype.removeCurrentListener = function() {
    this._listenerRemove = true;
};

module.exports = Event;
