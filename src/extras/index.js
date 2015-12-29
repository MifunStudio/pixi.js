/**
 * @file        Main export of the PIXI extras library
 * @author      Mat Groves <mat@goodboydigital.com>
 * @copyright   2013-2015 GoodBoyDigital
 * @license     {@link https://github.com/pixijs/pixi.js/blob/master/LICENSE|MIT License}
 */

require('./cacheAsBitmap');
require('./getChildByName');
require('./getGlobalPosition');
require('./eventBubbles');
require('./tween');

/**
 * @namespace PIXI.extras
 */
module.exports = {
    Event:          require('./Event'),
    MovieClip:      require('./MovieClip'),
    TilingSprite:   require('./TilingSprite'),
    BitmapText:     require('./BitmapText')
};
