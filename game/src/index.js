import PIXI from 'pixi.js';
import {StartScene} from './scene/StartScene';
import {LevelScene} from './scene/LevelScene';

var stage = new PIXI.Stage({
    view: document.getElementById('main'),
    viewport: new PIXI.FixedWidthViewport(640)
});
stage.ticker.start();

var startScene;
var levelScene;

startScene = new StartScene();
stage.addChild(startScene);

startScene.on('playBtnClick', () => {
    levelScene = new LevelScene();
    startScene.visible = false;
    stage.addChild(levelScene);



    levelScene.on('level.click', gotoLevel);
});

function gotoLevel(level) {

}
