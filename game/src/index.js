import PIXI = from 'pixi.js';
import {StartScene} from './scene/StartScene';

var stage = new PIXI.Stage({
    view: document.getElementById('main'),
    viewport: new PIXI.FixedWidthViewport(640)
});
stage.ticker.start();

var startScene = new StartScene();
stage.addChild(startScene);
