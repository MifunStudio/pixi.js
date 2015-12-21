var Event = require('../extras').Event;

function TouchEvent(params) {
    Event.call(this, params.type, params.bubbles, params.data);
    this._x = params.x;
    this._y = params.y;
    this._touch = params.touch;
    this._touchMoveDetection = params._touchMoveDetection || false;
    this._hammerEvent = params.hammerEvent;
    this._identifier = params.identifier;
}

TouchEvent.prototype = Object.create(Event.prototype);
TouchEvent.prototype.constructor = TouchEvent;

Object.defineProperties(TouchEvent.prototype, {
    x: {
        get: function() {
            return this._x;
        }
    },
    y: {
        get: function() {
            return this._y;
        }
    },
    touch: {
        get: function() {
            return this._touch;
        }
    },
    hammerEvent: {
        get: function() {
            return this._hammerEvent;
        }
    },
    identifier: {
        get: function() {
            return this._identifier;
        }
    }
});

TouchEvent.prototype.setTouchMoveDetection = function(value) {
    this._touchMoveDetection = value;
};

module.exports = TouchEvent;
