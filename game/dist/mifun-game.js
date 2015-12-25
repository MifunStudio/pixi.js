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

var _PreBattleScene = require('./scene/PreBattleScene');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stage = new _pixi2.default.Stage({
    view: document.getElementById('main'),
    viewport: new _pixi2.default.FixedWidthViewport(640)
});
stage.ticker.start();

var startScene;
var levelScene;
var preBattleScene;

startScene = new _StartScene.StartScene();
stage.addChild(startScene);

startScene.on('playBtnClick', function () {
    levelScene = new _LevelScene.LevelScene();
    startScene.visible = false;
    stage.addChild(levelScene);
    levelScene.on('level.click', gotoLevel);
});

function gotoLevel(level) {
    preBattleScene = new _PreBattleScene.PreBattleScene();
    stage.addChild(preBattleScene);
    levelScene.visible = false;
    preBattleScene.on('battleBtnClick', gotoBattle);
}

function gotoBattle() {}

},{"./scene/LevelScene":"/Users/mifunstudio/github/pixi.js/game/src/scene/LevelScene.js","./scene/PreBattleScene":"/Users/mifunstudio/github/pixi.js/game/src/scene/PreBattleScene.js","./scene/StartScene":"/Users/mifunstudio/github/pixi.js/game/src/scene/StartScene.js"}],"/Users/mifunstudio/github/pixi.js/game/src/scene/LevelScene.js":[function(require,module,exports){
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
            console.log(e);
            if (e.target.name.indexOf('level') === 0) {
                console.log('level.click');
                _this.emit('level.click', e.target.level);
            }
        });
        return _this;
    }

    return LevelScene;
})(_pixi2.default.Container);

},{"../fonts":"/Users/mifunstudio/github/pixi.js/game/src/fonts.js"}],"/Users/mifunstudio/github/pixi.js/game/src/scene/PreBattleScene.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PreBattleScene = undefined;

var _pixi = (window.PIXI);

var _pixi2 = _interopRequireDefault(_pixi);

var _fonts = require('../fonts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreBattleScene = exports.PreBattleScene = (function (_PIXI$Container) {
    _inherits(PreBattleScene, _PIXI$Container);

    function PreBattleScene() {
        _classCallCheck(this, PreBattleScene);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PreBattleScene).call(this));

        _this.battleBtn = new _pixi2.default.Text('战斗 >>', (0, _fonts.makeFontStyle)('40px'));
        _this.battleBtn.position.set(320, 500);
        _this.battleBtn.anchor.set(0.5);
        _this.battleBtn.interactive = true;
        _this.addChild(_this.battleBtn);

        _this.on('tap', function (e) {
            if (e.target === _this.battleBtn) {
                _this.emit('battleBtnClick');
            }
        });
        return _this;
    }

    return PreBattleScene;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZm9udHMuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvc2NlbmUvTGV2ZWxTY2VuZS5qcyIsInNyYy9zY2VuZS9QcmVCYXR0bGVTY2VuZS5qcyIsInNyYy9zY2VuZS9TdGFydFNjZW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7UUNBZ0IsYUFBYSxHQUFiLGFBQWE7QUFBdEIsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUN2QyxRQUFJLEdBQUcsSUFBSSxJQUFJLE1BQU0sQ0FBQztBQUN0QixTQUFLLEdBQUcsS0FBSyxJQUFJLFNBQVMsQ0FBQztBQUMzQixXQUFPO0FBQ0gsWUFBSSxZQUFXLElBQUksV0FBUTtBQUMzQixZQUFJLEVBQUcsS0FBSztBQUNaLGNBQU0sRUFBRyxTQUFTO0FBQ2xCLHVCQUFlLEVBQUcsQ0FBQztBQUNuQixrQkFBVSxFQUFHLElBQUk7QUFDakIsdUJBQWUsRUFBRyxTQUFTO0FBQzNCLHVCQUFlLEVBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO0FBQzdCLDBCQUFrQixFQUFHLENBQUM7QUFDdEIsZ0JBQVEsRUFBRyxJQUFJO0FBQ2YscUJBQWEsRUFBRyxHQUFHO0tBQ3RCLENBQUM7Q0FDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWRCxJQUFJLEtBQUssR0FBRyxJQUFJLGVBQUssS0FBSyxDQUFDO0FBQ3ZCLFFBQUksRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztBQUNyQyxZQUFRLEVBQUUsSUFBSSxlQUFLLGtCQUFrQixDQUFDLEdBQUcsQ0FBQztDQUM3QyxDQUFDLENBQUM7QUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUVyQixJQUFJLFVBQVUsQ0FBQztBQUNmLElBQUksVUFBVSxDQUFDO0FBQ2YsSUFBSSxjQUFjLENBQUM7O0FBRW5CLFVBQVUsR0FBRyxnQkFkTCxVQUFVLEVBY1csQ0FBQztBQUM5QixLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUUzQixVQUFVLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxZQUFNO0FBQ2hDLGNBQVUsR0FBRyxnQkFqQlQsVUFBVSxFQWlCZSxDQUFDO0FBQzlCLGNBQVUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQzNCLFNBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDM0IsY0FBVSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDM0MsQ0FBQyxDQUFDOztBQUVILFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRTtBQUN0QixrQkFBYyxHQUFHLG9CQXZCYixjQUFjLEVBdUJtQixDQUFDO0FBQ3RDLFNBQUssQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDL0IsY0FBVSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDM0Isa0JBQWMsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDbkQ7O0FBRUQsU0FBUyxVQUFVLEdBQUcsRUFFckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQy9CWSxVQUFVLFdBQVYsVUFBVTtjQUFWLFVBQVU7O0FBRW5CLGFBRlMsVUFBVSxHQUVMOzhCQUZMLFVBQVU7OzJFQUFWLFVBQVU7O0FBS2YsY0FBSyxTQUFTLEdBQUcsSUFBSSxlQUFLLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FQdkMsYUFBYSxFQU93QyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUN6RSxjQUFLLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwQyxjQUFLLFFBQVEsQ0FBQyxNQUFLLFNBQVMsQ0FBQyxDQUFDOztBQUU5QixjQUFLLE9BQU8sR0FBRyxJQUFJLGVBQUssU0FBUyxFQUFFLENBQUM7QUFDcEMsY0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbkMsY0FBSyxRQUFRLENBQUMsTUFBSyxPQUFPLENBQUMsQ0FBQzs7QUFFNUIsWUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLGFBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkIsaUJBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkIsc0JBQUssUUFBUSxHQUFHLElBQUksZUFBSyxJQUFJLENBQUMsSUFBSSxHQUFJLFFBQVEsRUFBRSxBQUFDLEVBQUUsV0FsQjNELGFBQWEsRUFrQjRELE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDMUUsc0JBQUssUUFBUSxDQUFDLElBQUksR0FBRyxPQUFPLEdBQUcsUUFBUSxDQUFDO0FBQ3hDLHNCQUFLLFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO0FBQy9CLHNCQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQzdDLHNCQUFLLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ2pDLHNCQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBSyxRQUFRLENBQUMsQ0FBQzthQUN4QztTQUNKOztBQUVELGNBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFDLENBQUMsRUFBSztBQUNsQixtQkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNmLGdCQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDckMsdUJBQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0Isc0JBQUssSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVDO1NBQ0osQ0FBQyxDQUFDOztLQUNOOztXQWhDUSxVQUFVO0dBQVMsZUFBSyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBakMsY0FBYyxXQUFkLGNBQWM7Y0FBZCxjQUFjOztBQUV2QixhQUZTLGNBQWMsR0FFVDs4QkFGTCxjQUFjOzsyRUFBZCxjQUFjOztBQUtuQixjQUFLLFNBQVMsR0FBRyxJQUFJLGVBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxXQVB4QyxhQUFhLEVBT3lDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDL0QsY0FBSyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdEMsY0FBSyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixjQUFLLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLGNBQUssUUFBUSxDQUFDLE1BQUssU0FBUyxDQUFDLENBQUM7O0FBRTlCLGNBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFDLENBQUMsRUFBSztBQUNsQixnQkFBRyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQUssU0FBUyxFQUFFO0FBQzVCLHNCQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQy9CO1NBQ0osQ0FBQyxDQUFDOztLQUNOOztXQWhCUSxjQUFjO0dBQVMsZUFBSyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBckMsVUFBVSxXQUFWLFVBQVU7Y0FBVixVQUFVOztBQUVuQixhQUZTLFVBQVUsR0FFTDs4QkFGTCxVQUFVOzsyRUFBVixVQUFVOztBQUtmLGNBQUssT0FBTyxHQUFHLElBQUksZUFBSyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBUHhDLGFBQWEsRUFPeUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUMvRCxjQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNwQyxjQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLGNBQUssT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDaEMsY0FBSyxRQUFRLENBQUMsTUFBSyxPQUFPLENBQUMsQ0FBQzs7QUFFNUIsY0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQUMsQ0FBQyxFQUFLO0FBQ2xCLGdCQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBSyxPQUFPLEVBQUU7QUFDMUIsc0JBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0osQ0FBQyxDQUFDOztLQUNOOztXQWhCUSxVQUFVO0dBQVMsZUFBSyxTQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBmdW5jdGlvbiBtYWtlRm9udFN0eWxlKHNpemUsIGNvbG9yKSB7XG4gICAgc2l6ZSA9IHNpemUgfHwgJzMwcHgnO1xuICAgIGNvbG9yID0gY29sb3IgfHwgJyNGRkZGRkYnO1xuICAgIHJldHVybiB7XG4gICAgICAgIGZvbnQgOiBgYm9sZCAke3NpemV9IEFyaWFsYCxcbiAgICAgICAgZmlsbCA6IGNvbG9yLFxuICAgICAgICBzdHJva2UgOiAnIzRhMTg1MCcsXG4gICAgICAgIHN0cm9rZVRoaWNrbmVzcyA6IDUsXG4gICAgICAgIGRyb3BTaGFkb3cgOiB0cnVlLFxuICAgICAgICBkcm9wU2hhZG93Q29sb3IgOiAnIzAwMDAwMCcsXG4gICAgICAgIGRyb3BTaGFkb3dBbmdsZSA6IE1hdGguUEkgLyA2LFxuICAgICAgICBkcm9wU2hhZG93RGlzdGFuY2UgOiA2LFxuICAgICAgICB3b3JkV3JhcCA6IHRydWUsXG4gICAgICAgIHdvcmRXcmFwV2lkdGggOiA0NDBcbiAgICB9O1xufVxuIiwiaW1wb3J0IFBJWEkgZnJvbSAncGl4aS5qcyc7XG5pbXBvcnQge1N0YXJ0U2NlbmV9IGZyb20gJy4vc2NlbmUvU3RhcnRTY2VuZSc7XG5pbXBvcnQge0xldmVsU2NlbmV9IGZyb20gJy4vc2NlbmUvTGV2ZWxTY2VuZSc7XG5pbXBvcnQge1ByZUJhdHRsZVNjZW5lfSBmcm9tICcuL3NjZW5lL1ByZUJhdHRsZVNjZW5lJztcblxudmFyIHN0YWdlID0gbmV3IFBJWEkuU3RhZ2Uoe1xuICAgIHZpZXc6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyksXG4gICAgdmlld3BvcnQ6IG5ldyBQSVhJLkZpeGVkV2lkdGhWaWV3cG9ydCg2NDApXG59KTtcbnN0YWdlLnRpY2tlci5zdGFydCgpO1xuXG52YXIgc3RhcnRTY2VuZTtcbnZhciBsZXZlbFNjZW5lO1xudmFyIHByZUJhdHRsZVNjZW5lO1xuXG5zdGFydFNjZW5lID0gbmV3IFN0YXJ0U2NlbmUoKTtcbnN0YWdlLmFkZENoaWxkKHN0YXJ0U2NlbmUpO1xuXG5zdGFydFNjZW5lLm9uKCdwbGF5QnRuQ2xpY2snLCAoKSA9PiB7XG4gICAgbGV2ZWxTY2VuZSA9IG5ldyBMZXZlbFNjZW5lKCk7XG4gICAgc3RhcnRTY2VuZS52aXNpYmxlID0gZmFsc2U7XG4gICAgc3RhZ2UuYWRkQ2hpbGQobGV2ZWxTY2VuZSk7XG4gICAgbGV2ZWxTY2VuZS5vbignbGV2ZWwuY2xpY2snLCBnb3RvTGV2ZWwpO1xufSk7XG5cbmZ1bmN0aW9uIGdvdG9MZXZlbChsZXZlbCkge1xuICAgIHByZUJhdHRsZVNjZW5lID0gbmV3IFByZUJhdHRsZVNjZW5lKCk7XG4gICAgc3RhZ2UuYWRkQ2hpbGQocHJlQmF0dGxlU2NlbmUpO1xuICAgIGxldmVsU2NlbmUudmlzaWJsZSA9IGZhbHNlO1xuICAgIHByZUJhdHRsZVNjZW5lLm9uKCdiYXR0bGVCdG5DbGljaycsIGdvdG9CYXR0bGUpO1xufVxuXG5mdW5jdGlvbiBnb3RvQmF0dGxlKCkge1xuICAgIFxufVxuIiwiaW1wb3J0IFBJWEkgZnJvbSAncGl4aS5qcyc7XG5pbXBvcnQge21ha2VGb250U3R5bGV9IGZyb20gJy4uL2ZvbnRzJztcblxuZXhwb3J0IGNsYXNzIExldmVsU2NlbmUgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmdvbGRMYWJlbCA9IG5ldyBQSVhJLlRleHQoJ+mHkeW4ge+8mjAnLCBtYWtlRm9udFN0eWxlKCc0MHB4JywgJyNGRkZGMDAnKSk7XG4gICAgICAgIHRoaXMuZ29sZExhYmVsLnBvc2l0aW9uLnNldCgxMCwgMTApO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuZ29sZExhYmVsKTtcblxuICAgICAgICB0aGlzLmxldmVsQ3QgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgICAgICAgdGhpcy5sZXZlbEN0LnBvc2l0aW9uLnNldCg1MCwgMjAwKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmxldmVsQ3QpO1xuXG4gICAgICAgIHZhciBsZXZlbE51bSA9IDA7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPDQ7IGkrKykge1xuICAgICAgICAgICAgZm9yKHZhciBqPTA7IGo8NDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbEJ0biA9IG5ldyBQSVhJLlRleHQoJ+WFs+WNoScgKyAobGV2ZWxOdW0rKyksIG1ha2VGb250U3R5bGUoJzMwcHgnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbEJ0bi5uYW1lID0gJ2xldmVsJyArIGxldmVsTnVtO1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxCdG4ubGV2ZWwgPSBsZXZlbE51bTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQnRuLnBvc2l0aW9uLnNldChqICogMTMwLCBpICogMTAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQnRuLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsQ3QuYWRkQ2hpbGQodGhpcy5sZXZlbEJ0bik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uKCd0YXAnLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICBpZihlLnRhcmdldC5uYW1lLmluZGV4T2YoJ2xldmVsJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbGV2ZWwuY2xpY2snKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2xldmVsLmNsaWNrJywgZS50YXJnZXQubGV2ZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBQSVhJIGZyb20gJ3BpeGkuanMnO1xuaW1wb3J0IHttYWtlRm9udFN0eWxlfSBmcm9tICcuLi9mb250cyc7XG5cbmV4cG9ydCBjbGFzcyBQcmVCYXR0bGVTY2VuZSBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuYmF0dGxlQnRuID0gbmV3IFBJWEkuVGV4dCgn5oiY5paXID4+JywgbWFrZUZvbnRTdHlsZSgnNDBweCcpKTtcbiAgICAgICAgdGhpcy5iYXR0bGVCdG4ucG9zaXRpb24uc2V0KDMyMCwgNTAwKTtcbiAgICAgICAgdGhpcy5iYXR0bGVCdG4uYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICB0aGlzLmJhdHRsZUJ0bi5pbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iYXR0bGVCdG4pO1xuXG4gICAgICAgIHRoaXMub24oJ3RhcCcsIChlKSA9PiB7XG4gICAgICAgICAgICBpZihlLnRhcmdldCA9PT0gdGhpcy5iYXR0bGVCdG4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2JhdHRsZUJ0bkNsaWNrJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IFBJWEkgZnJvbSAncGl4aS5qcyc7XG5pbXBvcnQge21ha2VGb250U3R5bGV9IGZyb20gJy4uL2ZvbnRzJztcblxuZXhwb3J0IGNsYXNzIFN0YXJ0U2NlbmUgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnBsYXlCdG4gPSBuZXcgUElYSS5UZXh0KCdQbGF5ID4+JywgbWFrZUZvbnRTdHlsZSgnNDBweCcpKTtcbiAgICAgICAgdGhpcy5wbGF5QnRuLnBvc2l0aW9uLnNldCgzMjAsIDUwMCk7XG4gICAgICAgIHRoaXMucGxheUJ0bi5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICAgIHRoaXMucGxheUJ0bi5pbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5wbGF5QnRuKTtcblxuICAgICAgICB0aGlzLm9uKCd0YXAnLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYoZS50YXJnZXQgPT09IHRoaXMucGxheUJ0bikge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgncGxheUJ0bkNsaWNrJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19
