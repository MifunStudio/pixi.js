function Viewport() {}

Viewport.prototype.constructor = Viewport;

Object.defineProperties(Viewport.prototype, {
    width: {
        get: function() {
            return this._width;
        }
    },
    height: {
        get: function() {
            return this._height;
        }
    }
});

Viewport.prototype.resizeViewport = function(screenWidth, screenHeight) {
    return screenWidth + screenHeight;
};

Viewport.prototype._init = function(stage) {
    this._stage = stage;
    this._width = stage.renderer.view.width;
    this._height = stage.renderer.view.height;

    this._bindResizeEvent();
};

Viewport.prototype._bindResizeEvent = function() {
    var me = this;
    function onResize() {
        me.resizeViewport(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
};

function FixedWidthViewport(fixedWidth) {
    Viewport.call(this);
    this._fixedWidth = fixedWidth;
}

FixedWidthViewport.prototype = Object.create(Viewport.prototype);
FixedWidthViewport.prototype.constructor = FixedWidthViewport;

FixedWidthViewport.prototype.resizeViewport = function(screenWidth, screenHeight) {
    var width = this._fixedWidth;
    var height = Math.ceil(screenHeight * width / screenWidth);
    this._stage.renderer.resize(width, height);
    this._width = width;
    this._height = height;
    this._stage.emit('viewport.resize', {
        width: width,
        height: height
    });
};

module.exports = {
    Viewport: Viewport,
    FixedWidthViewport: FixedWidthViewport
};
