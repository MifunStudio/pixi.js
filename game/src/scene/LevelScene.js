import PIXI from 'pixi.js';
import {makeFontStyle} from '../fonts';

export class LevelScene extends PIXI.Container {

    constructor() {
        super();

        this.goldLabel = new PIXI.Text('金币：0', makeFontStyle('40px', '#FFFF00'));
        this.goldLabel.position.set(10, 10);
        this.addChild(this.goldLabel);

        this.levelCt = new PIXI.Container();
        this.levelCt.position.set(50, 200);
        this.addChild(this.levelCt);

        var levelNum = 0;
        for(var i=0; i<4; i++) {
            for(var j=0; j<4; j++) {
                this.levelBtn = new PIXI.Text('关卡' + (levelNum++), makeFontStyle('30px'));
                this.levelBtn.name = 'level' + levelNum;
                this.levelBtn.level = levelNum;
                this.levelBtn.position.set(j * 130, i * 100);
                this.levelBtn.interactive = true;
                this.levelCt.addChild(this.levelBtn);
            }
        }

        this.on('tap', (e) => {
            console.log(e);
            if(e.target.name.indexOf('level') === 0) {
                console.log('level.click');
                this.emit('level.click', e.target.level);
            }
        });
    }

}
