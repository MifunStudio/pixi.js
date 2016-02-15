var Hammer = require('hammerjs');
var core = require('../core');
var TouchEvent = require('./TouchEvent');

var sharedPoint = new core.Point(0, 0);
var sharedPoint2 = new core.Point(0, 0);

core.DisplayObject.prototype.interactive = false;
core.DisplayObject.prototype.interactiveChildren = true;

function Touch(stage, gestures) {
    var me = this;
    this.enabled = true;
    this._stage = stage;
    this._channelMap = {};
    this._initHammer(gestures);
}

Touch.prototype.constructor = Touch;

Touch.prototype._initHammer = function(gestures) {
    var me = this;
    this._hammer = new Hammer(this._stage.renderer.view);
    this._hammer.get('pan').set({ threshold: 0 });
    this._hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    this._hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    this._hammer.on(this._parseGestrues(gestures), function(e) {
        if(e.type === 'pan') return;
        if(e.type === 'hammer.input' && !e.isFinal && !e.isFirst) {
            return;
        }
        if (e.isFinal || me.enabled) {
            me._onHammerEvent(e);
        }
    });
};

Touch.prototype._parseGestrues = function(gestures) {
    gestures = gestures || 'tap';
    if(gestures.indexOf('hammer.input') === -1) {
        gestures = 'hammer.input ' + gestures;
    }
    return gestures;
};

Touch.prototype._onHammerEvent = function(e) {
    var x, y,
        i, len,
        touch,
        identifier,
        channel,
        changedTouches,
        target,
        type = e.type,
        stage = this._stage;

    var me = this;
    var isFinalButNotHammerInput = type !== 'hammer.input' && e.isFinal;
    var viewClientRect = this._stage.renderer.view.getBoundingClientRect();
    var viewWidth = this._stage.renderer.view.width;
    var viewHeight = this._stage.renderer.view.height;

    if(type === 'hammer.input') {
        if (e.isFirst) {
            type = 'touch';
        }
        else if (e.isFinal) {
            type = 'release';
        }
    }

    changedTouches = e.srcEvent.changedTouches;

    if (!changedTouches) {
        identifier = 1;

        this._mapPositionToPoint(sharedPoint, e.srcEvent.clientX, e.srcEvent.clientY,
            viewClientRect, viewWidth, viewHeight);

        x = sharedPoint.x;
        y = sharedPoint.y;

        if (type === 'touch') {
            target = this._getUnderPointObject(stage, x, y);
            if (target) {
                me._channelMap[identifier] = me._createDispatchChannel(target);
            }
        }

        channel = me._channelMap[identifier];
        if(channel) {
            channel.onHammerEvent(e, target, x, y, identifier);
        }
    } else {
        len = changedTouches.length;
        for(i=0; i<len; i++) {
            touch = changedTouches[i];
            identifier = parseInt(touch.identifier);

            this._mapPositionToPoint(sharedPoint, touch.clientX, touch.clientY,
                viewClientRect, viewWidth, viewHeight);

            x = sharedPoint.x;
            y = sharedPoint.y;

            if (type === 'touch') {
                target = this._getUnderPointObject(stage, x, y);
                if (target) {
                    me._channelMap[identifier] = me._createDispatchChannel(target);
                }
            }

            channel = me._channelMap[identifier];
            if(channel) {
                channel.onHammerEvent(e, target, x, y, identifier, isFinalButNotHammerInput);
            }
        }
    }
};

Touch.prototype._createDispatchChannel = function(touchTarget) {
    var me = this;
    var stage = me._stage;
    var touchMoveDetection = true;
    return {
        onHammerEvent : function(e, target, x, y, identifier, isFinalButNotHammerInput) {
            var touchEvent,
                type = e.type;

            if(type === 'hammer.input') {
                if(e.isFirst) {
                    type = 'touch';
                }
                else if(e.isFinal) {
                    type = 'release';
                }
            }

            switch (type) {
                case 'panmove':
                    if (!touchMoveDetection) {
                        target = touchTarget;
                        break;
                    }
                    target = me._getUnderPointObject(stage, x, y);
                    break;
                case 'release':
                    target = me._getUnderPointObject(stage, x, y);
                    break;
                case 'tap':
                    target = me._getUnderPointObject(stage, x, y);
                    break;
            }

            if(type === 'tap' && touchTarget !== target) {
                return;
            }

            touchEvent = new TouchEvent({
                x: x,
                y: y,
                type: type,
                bubbles: true,
                touch: target,
                hammerEvent : e,
                identifier : identifier,
                touchMoveDetection : false
            });
            me._dispatchEvent(touchTarget, touchEvent, identifier, isFinalButNotHammerInput);
            touchMoveDetection = touchEvent.touchMoveDetection;
        }
    };
};

Touch.prototype._mapPositionToPoint = function(point, x, y, viewBoundingClientRect, viewWidth, viewHeight) {
    var resolution = this._stage.renderer.resolution;
    point.x = ( ( x - viewBoundingClientRect.left ) * (viewWidth  / viewBoundingClientRect.width  ) ) / resolution;
    point.y = ( ( y - viewBoundingClientRect.top  ) * (viewHeight / viewBoundingClientRect.height ) ) / resolution;
};

Touch.prototype._getUnderPointObject = function(target, x, y) {
    if(!target.visible) {
        return;
    }

    var hit;
    if(target.interactiveChildren) {
        var children = target.children;
        if(children && children.length > 0) {
            for(var i=children.length-1; i>=0; i--) {
                var child = children[i];
                hit = this._getUnderPointObject(child, x, y);
                if(hit) {
                    return hit;
                }
            }
        }
    }
    if(!target.interactive) {
        return;
    }
    sharedPoint.x = x;
    sharedPoint.y = y;
    if(target.hitArea) {
        target.worldTransform.applyInverse(sharedPoint, sharedPoint2);
        hit = target.hitArea.contains(sharedPoint2.x, sharedPoint2.y);
    } else if(target.containsPoint) {
        hit = target.containsPoint(sharedPoint);
    }
    if(hit) {
        return target;
    }
};

Touch.prototype._dispatchEvent = function(target, e, identifier, isFinalButNotHammerInput) {
    var me = this;
    e.setTarget(target);
    me._stage.scheduler.frame(function() {
        // do clear channel
        if(isFinalButNotHammerInput) {
            delete me._channelMap[identifier];
        }
        target.emit(e.type, e);
    });
};

module.exports = Touch;
