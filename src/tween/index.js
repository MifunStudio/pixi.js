var Tween = require('./Tween');
var Ease = require('./Ease');

var core = require('../core'),
    sharedTicker = core.ticker.shared,
    DisplayObject = core.DisplayObject;

var genTweenId = (function() {
    var idSeed = 1;
    return function() {
        return 'TWEEN_' + (idSeed++);
    }
})();

Tween._register = function(tween, value) {

};

Tween.prototype.callRemove = function() {
    var self = this;
    this.call(function() {
        self.tweenTransform.removeTween(self);
    });
}

function TweenTransform(displayObject) {
    this.displayObject = displayObject;
    this.tweens = [];
}

TweenTransform.prototype.tweenjs_count = 0;

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

TweenTransform.prototype.tick = function(delta) {
    if(this.tweens.length === 0) return;
    var tweens = this.tweens.slice(0);
    for (var i=0,len=tweens.length; i<len; i++) {
        var tween = tweens[i];
        tween.tick(delta);
    }
};

TweenTransform.prototype.tween = function(clearTweens) {
    var tween;
    if(clearTweens) {
        this.tweens.length = 0;
    }
    tween = Tween.get(this);
    tween.tweenTransform = this;
    this.tweens.push(tween);
    return tween;
};

TweenTransform.prototype.removeTween = function(tween) {
    var tweens = this.tweens;
    for (var i=0,len=tweens.length; i<len; i++) {
        if(tween === tweens[i]) {
            tweens.splice(i, 1);
            break;
        }
    }
};

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

var originalUpdateTransform = DisplayObject.prototype.displayObjectUpdateTransform;
DisplayObject.prototype.displayObjectUpdateTransform = function() {
    this.tweenTransform.tick(sharedTicker.elapsedMS);
    originalUpdateTransform.call(this);
};

DisplayObject.prototype.removeTween = function(tween) {
    this.tweenTransform.removeTween(tween);
};

DisplayObject.prototype.tween = function(clearTweens) {
    return this.tweenTransform.tween(clearTweens);
};

DisplayObject.prototype.clearTweens = function() {
    this.tweenTransform.tweens.length = 0;
};

module.exports = {
    Tween: Tween,
    Ease: Ease
};
