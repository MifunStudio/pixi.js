var TWEEN = require('tween.js');
var core = require('../core'),
    DisplayObject = core.DisplayObject;

var genTweenId = (function() {
    var idSeed = 1;
    return function() {
        return 'TWEEN_' + (idSeed++);
    }
})();

function TweenTransform(displayObject) {
    this.displayObject = displayObject;
}
Object.defineProperties(TweenTransform.prototype, {
    x: {
        get: function() {
            return this.displayObject.x;
        },
        set: function(value) {
            this.displayObject.x = value;
        }
    },
    y: {
        get: function() {
            return this.displayObject.y;
        },
        set: function(value) {
            this.displayObject.y = value;
        }
    },
    scaleX: {
        get: function() {
            return this.displayObject.scaleX;
        },
        set: function(value) {
            this.displayObject.scaleX = value;
        }
    },
    scaleY: {
        get: function() {
            return this.displayObject.scaleY;
        },
        set: function(value) {
            this.displayObject.scaleY = value;
        }
    },
    alpha: {
        get: function() {
            return this.displayObject.alpha;
        },
        set: function(value) {
            this.displayObject.alpha = value;
        }
    },
    rotation: {
        get: function() {
            return this.displayObject.rotation;
        },
        set: function(value) {
            this.displayObject.rotation = value;
        }
    }
});

DisplayObject.prototype._tweenTransform = null;

Object.defineProperties(DisplayObject.prototype, {
    tweenTransform: {
        get: function() {
            if(!this._tweenTransform) {
                this._tweenTransform = new TweenTransform(this);
            }
            return this._tweenTransform;
        }
    }
});

DisplayObject.prototype.tween = function(clearTweens) {
    var tween;
    if(clearTweens) {
        this.clearTweens();
    }
    this._tweens = this._tweens || {};
    tween = new TWEEN.Tween(this.tweenTransform);
    tween.start();
    this._tweens[genTweenId()] = tween;
    return tween;
};

DisplayObject.prototype.clearTweens = function() {
    this._tweens = this._tweens || {};
    for(var id in this._tweens) {
        TWEEN.remove(this._tweens[id]);
    }
    this._tweens = {};
};
