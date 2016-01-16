var Loader = require('../loaders').Loader,
    tiledParser = require('./tiledParser');

Loader.addPixiMiddleware(tiledParser);

module.exports = {
    tiledParser: tiledParser
};
