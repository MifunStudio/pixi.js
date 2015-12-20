var core = require('./core');
var Viewport = require('./Viewport').Viewport;
var Container = core.Container;
var sharedTicker = core.ticker.shared;

sharedTicker.autoStart = false;
sharedTicker.stop();

function Stage(options) {
    Container.call(this);
    this._options = Object.assign({
        backgroundColor: 0x000000
    }, options);
    this._ticker = sharedTicker;
    this._renderer = core.autoDetectRenderer(960, 640, {
        view: this._options.view,
        backgroundColor: this._options.backgroundColor
    });
    this._viewport = options.viewport || new Viewport(960, 640);
    this._viewport._init(this);
}

Stage.prototype = Object.create(Container.prototype);

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
    }
});

Stage.prototype.runStep = function() {
    this.renderer.render(this);
};

module.exports = Stage;
