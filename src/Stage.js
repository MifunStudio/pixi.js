var Tween = require('./tween').Tween;
var core = require('./core');
var sharedTicker = core.ticker.shared;
var Scheduler = require('./Scheduler');
var Viewport = require('./Viewport').Viewport;
var Container = core.Container;
var Touch = require('./touch').Touch;
var DnDManager = require('./touch').DnDManager;

sharedTicker.autoStart = false;
sharedTicker.stop();

function Stage(options) {
    Container.call(this);
    this._options = Object.assign({
        touchEanbled: true,
        dragAndDrop: false,
        gestures: this.gestures || (options.dragAndDrop ? 'tap panstart panmove panend pancancel' : 'tap'),
        resolution: 1,
        preserveDrawingBuffer: false
    }, options);

    this._ticker = sharedTicker;
    this._scheduler = Scheduler;

    this._renderer = core.autoDetectRenderer(960, 640, {
        view: this._options.view,
        backgroundColor: this._options.backgroundColor,
        preserveDrawingBuffer: this._options.preserveDrawingBuffer,
        resolution: this._options.resolution
    });
    this._viewport = options.viewport || new Viewport(960, 640);
    this._viewport._init(this);
    this._touch = new Touch(this, this._options.gestures);
    this._touch.enabled = this._options.touchEanbled;
    if(this._options.dragAndDrop) {
        this._dndManager = new DnDManager(this);
    }
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
    scheduler: {
        get: function() {
            return this._scheduler;
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
    },
    dndManager: {
        get: function() {
            return this._dndManager;
        }
    }
});

Stage.prototype.emit = function() {
    Container.prototype.emit.apply(this, arguments);
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = '*';
    Container.prototype.emit.apply(this, args);
};

Stage.prototype.runStep = function() {
    this.renderer.render(this);
    Tween.tick(this.ticker.elapsedMS);
    Scheduler.runSchedule(this.ticker.elapsedMS);
};

module.exports = Stage;
