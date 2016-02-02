// run the polyfills
require('./polyfill');

var core = module.exports = require('./core');

// add core plugins.
core.extras         = require('./extras');
core.filters        = require('./filters');
// core.interaction    = require('./interaction');
core.loaders        = require('./loaders');
core.mesh           = require('./mesh');

// export mifun custom modules
core.touch = require('./touch');
core.Event = core.extras.Event;
core.Stage = require('./Stage');
core.Scheduler = require('./Scheduler');
core.Ease = require('./tween/index').Ease;
core.Tween = require('./tween/index').Tween;
core.Viewport = require('./Viewport').Viewport;
core.FixedWidthViewport = require('./Viewport').FixedWidthViewport;

// export a premade loader instance
/**
 * A premade instance of the loader that can be used to loader resources.
 *
 * @name loader
 * @memberof PIXI
 * @property {PIXI.loaders.Loader}
 */
core.loader = new core.loaders.Loader();

// mixin the deprecation features.
Object.assign(core, require('./deprecation'));

// Always export pixi globally.
global.PIXI = core;
