import PIXI from 'pixi.js';
import {makeFontStyle} from '../fonts';

export class PreBattleScene extends PIXI.Container {

    constructor() {
        super();

        this.battleBtn = new PIXI.Text('战斗 >>', makeFontStyle('40px'));
        this.battleBtn.position.set(320, 500);
        this.battleBtn.anchor.set(0.5);
        this.battleBtn.interactive = true;
        this.addChild(this.battleBtn);

        this.on('tap', (e) => {
            if(e.target === this.battleBtn) {
                this.emit('battleBtnClick');
            }
        });
    }

}
