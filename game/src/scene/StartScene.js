import PIXI from 'pixi.js';
import {makeFontStyle} from '../fonts';

export class StartScene extends PIXI.Container {

    constructor() {
        super();

        this.playBtn = new PIXI.Text('Play >>', makeFontStyle('40px'));
        this.playBtn.position.set(320, 500);
        this.playBtn.anchor.set(0.5);
        this.playBtn.interactive = true;
        this.addChild(this.playBtn);

        this.on('tap', (e) => {
            if(e.target === this.playBtn) {
                this.emit('playBtnClick');
            }
        });
    }

}
