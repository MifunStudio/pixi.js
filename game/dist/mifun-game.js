(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/mifunstudio/github/pixi.js/game/src/fonts.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeFontStyle = makeFontStyle;
function makeFontStyle(size, color) {
    size = size || '30px';
    color = color || '#FFFFFF';
    return {
        font: 'bold ' + size + ' Arial',
        fill: color,
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    };
}

},{}],"/Users/mifunstudio/github/pixi.js/game/src/index.js":[function(require,module,exports){
'use strict';

var _pixi = (window.PIXI);

var _pixi2 = _interopRequireDefault(_pixi);

var _StartScene = require('./scene/StartScene');

var _LevelScene = require('./scene/LevelScene');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stage = new _pixi2.default.Stage({
    view: document.getElementById('main'),
    viewport: new _pixi2.default.FixedWidthViewport(640)
});
stage.ticker.start();

var startScene;
var levelScene;

startScene = new _StartScene.StartScene();
stage.addChild(startScene);

startScene.on('playBtnClick', function () {
    levelScene = new _LevelScene.LevelScene();
    startScene.visible = false;
    stage.addChild(levelScene);

    levelScene.on('level.click', gotoLevel);
});

function gotoLevel(level) {}

},{"./scene/LevelScene":"/Users/mifunstudio/github/pixi.js/game/src/scene/LevelScene.js","./scene/StartScene":"/Users/mifunstudio/github/pixi.js/game/src/scene/StartScene.js"}],"/Users/mifunstudio/github/pixi.js/game/src/scene/LevelScene.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LevelScene = undefined;

var _pixi = (window.PIXI);

var _pixi2 = _interopRequireDefault(_pixi);

var _fonts = require('../fonts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LevelScene = exports.LevelScene = (function (_PIXI$Container) {
    _inherits(LevelScene, _PIXI$Container);

    function LevelScene() {
        _classCallCheck(this, LevelScene);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LevelScene).call(this));

        _this.goldLabel = new _pixi2.default.Text('金币：0', (0, _fonts.makeFontStyle)('40px', '#FFFF00'));
        _this.goldLabel.position.set(10, 10);
        _this.addChild(_this.goldLabel);

        _this.levelCt = new _pixi2.default.Container();
        _this.levelCt.position.set(50, 200);
        _this.addChild(_this.levelCt);

        var levelNum = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                _this.levelBtn = new _pixi2.default.Text('关卡' + levelNum++, (0, _fonts.makeFontStyle)('30px'));
                _this.levelBtn.name = 'level' + levelNum;
                _this.levelBtn.level = levelNum;
                _this.levelBtn.position.set(j * 130, i * 100);
                _this.levelBtn.interactive = true;
                _this.levelCt.addChild(_this.levelBtn);
            }
        }

        _this.on('tap', function (e) {
            if (e.target.name.indexOf('level') === 0) {
                _this.emit('level.click', e.target.level);
            }
        });
        return _this;
    }

    return LevelScene;
})(_pixi2.default.Container);

},{"../fonts":"/Users/mifunstudio/github/pixi.js/game/src/fonts.js"}],"/Users/mifunstudio/github/pixi.js/game/src/scene/StartScene.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StartScene = undefined;

var _pixi = (window.PIXI);

var _pixi2 = _interopRequireDefault(_pixi);

var _fonts = require('../fonts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StartScene = exports.StartScene = (function (_PIXI$Container) {
    _inherits(StartScene, _PIXI$Container);

    function StartScene() {
        _classCallCheck(this, StartScene);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StartScene).call(this));

        _this.playBtn = new _pixi2.default.Text('Play >>', (0, _fonts.makeFontStyle)('40px'));
        _this.playBtn.position.set(320, 500);
        _this.playBtn.anchor.set(0.5);
        _this.playBtn.interactive = true;
        _this.addChild(_this.playBtn);

        _this.on('tap', function (e) {
            if (e.target === _this.playBtn) {
                _this.emit('playBtnClick');
            }
        });
        return _this;
    }

    return StartScene;
})(_pixi2.default.Container);

},{"../fonts":"/Users/mifunstudio/github/pixi.js/game/src/fonts.js"}]},{},["/Users/mifunstudio/github/pixi.js/game/src/index.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZm9udHMuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvc2NlbmUvTGV2ZWxTY2VuZS5qcyIsInNyYy9zY2VuZS9TdGFydFNjZW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7UUNBZ0IsYUFBYSxHQUFiLGFBQWE7QUFBdEIsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUN2QyxRQUFJLEdBQUcsSUFBSSxJQUFJLE1BQU0sQ0FBQztBQUN0QixTQUFLLEdBQUcsS0FBSyxJQUFJLFNBQVMsQ0FBQztBQUMzQixXQUFPO0FBQ0gsWUFBSSxZQUFXLElBQUksV0FBUTtBQUMzQixZQUFJLEVBQUcsS0FBSztBQUNaLGNBQU0sRUFBRyxTQUFTO0FBQ2xCLHVCQUFlLEVBQUcsQ0FBQztBQUNuQixrQkFBVSxFQUFHLElBQUk7QUFDakIsdUJBQWUsRUFBRyxTQUFTO0FBQzNCLHVCQUFlLEVBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO0FBQzdCLDBCQUFrQixFQUFHLENBQUM7QUFDdEIsZ0JBQVEsRUFBRyxJQUFJO0FBQ2YscUJBQWEsRUFBRyxHQUFHO0tBQ3RCLENBQUM7Q0FDTDs7Ozs7Ozs7Ozs7Ozs7O0FDWEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxlQUFLLEtBQUssQ0FBQztBQUN2QixRQUFJLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7QUFDckMsWUFBUSxFQUFFLElBQUksZUFBSyxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7Q0FDN0MsQ0FBQyxDQUFDO0FBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFckIsSUFBSSxVQUFVLENBQUM7QUFDZixJQUFJLFVBQVUsQ0FBQzs7QUFFZixVQUFVLEdBQUcsZ0JBWkwsVUFBVSxFQVlXLENBQUM7QUFDOUIsS0FBSyxD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RSxHQUFHLENBQUMsQ0FBQztBQUNwQyxjQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLGNBQUssT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDaEMsY0FBSyxRQUFRLENBQUMsTUFBSyxPQUFPLENBQUMsQ0FBQzs7QUFFNUIsY0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQUMsQ0FBQyxFQUFLO0FBQ2xCLGdCQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBSyxPQUFPLEVBQUU7QUFDMUIsc0JBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0osQ0FBQyxDQUFDOztLQUNOOztXQWhCUSxVQUFVO0dBQVMsZUFBSyxTQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBmdW5jdGlvbiBtYWtlRm9udFN0eWxlKHNpemUsIGNvbG9yKSB7XG4gICAgc2l6ZSA9IHNpemUgfHwgJzMwcHgnO1xuICAgIGNvbG9yID0gY29sb3IgfHwgJyNGRkZGRkYnO1xuICAgIHJldHVybiB7XG4gICAgICAgIGZvbnQgOiBgYm9sZCAke3NpemV9IEFyaWFsYCxcbiAgICAgICAgZmlsbCA6IGNvbG9yLFxuICAgICAgICBzdHJva2UgOiAnIzRhMTg1MCcsXG4gICAgICAgIHN0cm9rZVRoaWNrbmVzcyA6IDUsXG4gICAgICAgIGRyb3BTaGFkb3cgOiB0cnVlLFxuICAgICAgICBkcm9wU2hhZG93Q29sb3IgOiAnIzAwMDAwMCcsXG4gICAgICAgIGRyb3BTaGFkb3dBbmdsZSA6IE1hdGguUEkgLyA2LFxuICAgICAgICBkcm9wU2hhZG93RGlzdGFuY2UgOiA2LFxuICAgICAgICB3b3JkV3JhcCA6IHRydWUsXG4gICAgICAgIHdvcmRXcmFwV2lkdGggOiA0NDBcbiAgICB9O1xufVxuIiwiaW1wb3J0IFBJWEkgZnJvbSAncGl4aS5qcyc7XG5pbXBvcnQge1N0YXJ0U2NlbmV9IGZyb20gJy4vc2NlbmUvU3RhcnRTY2VuZSc7XG5pbXBvcnQge0xldmVsU2NlbmV9IGZyb20gJy4vc2NlbmUvTGV2ZWxTY2VuZSc7XG5cbnZhciBzdGFnZSA9IG5ldyBQSVhJLlN0YWdlKHtcbiAgICB2aWV3OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpLFxuICAgIHZpZXdwb3J0OiBuZXcgUElYSS5GaXhlZFdpZHRoVmlld3BvcnQoNjQwKVxufSk7XG5zdGFnZS50aWNrZXIuc3RhcnQoKTtcblxudmFyIHN0YXJ0U2NlbmU7XG52YXIgbGV2ZWxTY2VuZTtcblxuc3RhcnRTY2VuZSA9IG5ldyBTdGFydFNjZW5lKCk7XG5zdGFnZS5hZGRDaGlsZChzdGFydFNjZW5lKTtcblxuc3RhcnRTY2VuZS5vbigncGxheUJ0bkNsaWNrJywgKCkgPT4ge1xuICAgIGxldmVsU2NlbmUgPSBuZXcgTGV2ZWxTY2VuZSgpO1xuICAgIHN0YXJ0U2NlbmUudmlzaWJsZSA9IGZhbHNlO1xuICAgIHN0YWdlLmFkZENoaWxkKGxldmVsU2NlbmUpO1xuXG5cblxuICAgIGxldmVsU2NlbmUub24oJ2xldmVsLmNsaWNrJywgZ290b0xldmVsKTtcbn0pO1xuXG5mdW5jdGlvbiBnb3RvTGV2ZWwobGV2ZWwpIHtcblxufVxuIiwiaW1wb3J0IFBJWEkgZnJvbSAncGl4aS5qcyc7XG5pbXBvcnQge21ha2VGb250U3R5bGV9IGZyb20gJy4uL2ZvbnRzJztcblxuZXhwb3J0IGNsYXNzIExldmVsU2NlbmUgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmdvbGRMYWJlbCA9IG5ldyBQSVhJLlRleHQoJ+mHkeW4ge+8mjAnLCBtYWtlRm9udFN0eWxlKCc0MHB4JywgJyNGRkZGMDAnKSk7XG4gICAgICAgIHRoaXMuZ29sZExhYmVsLnBvc2l0aW9uLnNldCgxMCwgMTApO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuZ29sZExhYmVsKTtcblxuICAgICAgICB0aGlzLmxldmVsQ3QgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgICAgICAgdGhpcy5sZXZlbEN0LnBvc2l0aW9uLnNldCg1MCwgMjAwKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmxldmVsQ3QpO1xuXG4gICAgICAgIHZhciBsZXZlbE51bSA9IDA7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPDQ7IGkrKykge1xuICAgICAgICAgICAgZm9yKHZhciBqPTA7IGo8NDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbEJ0biA9IG5ldyBQSVhJLlRleHQoJ+WFs+WNoScgKyAobGV2ZWxOdW0rKyksIG1ha2VGb250U3R5bGUoJzMwcHgnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbEJ0bi5uYW1lID0gJ2xldmVsJyArIGxldmVsTnVtO1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxCdG4ubGV2ZWwgPSBsZXZlbE51bTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQnRuLnBvc2l0aW9uLnNldChqICogMTMwLCBpICogMTAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQnRuLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ3QuYWRkQ2hpbGQodGhpcy5sZXZlbEJ0bik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uKCd0YXAnLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYoZS50YXJnZXQubmFtZS5pbmRleE9mKCdsZXZlbCcpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdsZXZlbC5jbGljaycsIGUudGFyZ2V0LmxldmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgUElYSSBmcm9tICdwaXhpLmpzJztcbmltcG9ydCB7bWFrZUZvbnRTdHlsZX0gZnJvbSAnLi4vZm9udHMnO1xuXG5leHBvcnQgY2xhc3MgU3RhcnRTY2VuZSBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMucGxheUJ0biA9IG5ldyBQSVhJLlRleHQoJ1BsYXkgPj4nLCBtYWtlRm9udFN0eWxlKCc0MHB4JykpO1xuICAgICAgICB0aGlzLnBsYXlCdG4ucG9zaXRpb24uc2V0KDMyMCwgNTAwKTtcbiAgICAgICAgdGhpcy5wbGF5QnRuLmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgdGhpcy5wbGF5QnRuLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnBsYXlCdG4pO1xuXG4gICAgICAgIHRoaXMub24oJ3RhcCcsIChlKSA9PiB7XG4gICAgICAgICAgICBpZihlLnRhcmdldCA9PT0gdGhpcy5wbGF5QnRuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdwbGF5QnRuQ2xpY2snKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=
