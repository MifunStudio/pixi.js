var Event = require('../../extras/Event');

function DnDEvent(type, touchEvent) {
    Event.call(type, true);
    this._touchEvent = touchEvent;
    this._canceled = false;
    this._dragImage = null;
}

DnDEvent.prototype = Object.create(Event.prototype);

Object.defineProperties(DnDEvent.prototype, {
    x: {
        get: function() {
            return this._touchEvent.x;
        }
    },
    y: {
        get: function() {
            return this._touchEvent.y;
        }
    },
    touchEvent: {
        get: function() {
            return this._touchEvent;
        }
    },
    dragImage: {
        get: function() {
            return this._dragImage;
        }
    },
    canceled: {
        get: function() {
            return this._canceled;
        }
    }
});

DnDEvent.prototype.cancel = function() {
    this._canceled = true;
};

DnDEvent.prototype.setDragImage = function(displayObject) {
    this._dragImage = displayObject;
};

DnDEvent.prototype.setData = function(data) {
    this._data = data;
};

module.exports = DnDEvent;
