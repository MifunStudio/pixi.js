var core = require('./core');
var sharedTicker = core.ticker.shared;
var Viewport = require('./Viewport').Viewport;
var Container = core.Container;
var Touch = require('./touch').Touch;

sharedTicker.autoStart = false;
sharedTicker.stop();

function Stage(options) {
    Container.call(this);
    this._options = Object.assign({
        touchEanbled: true
    }, options);
    this._ticker = sharedTicker;
    this._renderer = core.autoDetectRenderer(960, 640, {
        view: this._options.view,
        backgroundColor: this._options.backgroundColor
    });
    this._viewport = options.viewport || new Viewport(960, 640);
    this._viewport._init(this);
    this._touch = new Touch(this, this._options.gestures);
    this._touch.enabled = this._options.touchEanbled;
    this._ticker.add(this.runStep, this);
}

Stage.prototype = Object.create(Container.prototype);
Stage.prototype.constructor = Stage;

Object.defineProperties(Stage.prototype, {
    ticker: {
        get: function() {
            return this._ticker;
        }
    },
    renderer: {
        get: function() {
            return this._renderer;
        }
    },
    viewport: {
        get: function() {
            return this._viewport;
        }
    },
    touch: {
        get: function() {
            return this._touch;
        }
    }
});

Stage.prototype.runStep = function() {
    this.renderer.render(this);
};

module.exports = Stage;
