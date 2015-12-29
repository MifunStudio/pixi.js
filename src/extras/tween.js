var TWEEN = require('tween.js');
var core = require('../core'),
    DisplayObject = core.DisplayObject;

var genTweenId = (function() {
    var idSeed = 1;
    return function() {
        return 'TWEEN_' + (idSeed++);
    }
})();

DisplayObject.prototype.tween = function(clearTweens) {
    var tween;
    if(clearTweens) {
        this.clearTweens();
    }
    this._tweens = this._tweens || {};
    tween = new TWEEN.Tween(this);
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
