var path = require('path'),
    Resource = require('resource-loader').Resource,
    core = require('../core');

module.exports = function() {
    return function(resource, next) {
        if (!resource.data || !resource.isJson || !resource.data.layers || !resource.data.tilesets) {
            return next();
        }

        var loadOptions = {
            crossOrigin: resource.crossOrigin,
            loadType: Resource.LOAD_TYPE.IMAGE
        };

        var route = path.dirname(resource.url.replace(this.baseUrl, ''));
        var loaded = 0;
        var allImages = [];

        // image layer
        var layers = resource.data.layers;
        if(layers && layers.length > 0) {
            for(var i=0,len=layers.length; i<len; i++) {
                var imageId;
                var layer = layers[i];
                if(layer.type === 'imagelayer' && layer.image) {
                    imageId = layer.properties && layer.properties.imageId || layer.image;
                    allImages.push({
                        imageId: imageId,
                        path: route + '/' + layer.image
                    });
                }
            }
        }

        // tilesets
        var tilesets = resource.data.tilesets;
        if(tilesets && tilesets.length > 0) {
            for(var i=0,len=tilesets.length; i<len; i++) {
                var imageId;
                var tileset = tilesets[i];
                if(tileset.image) {
                    imageId = tileset.properties && tileset.properties.imageId || tileset.image;
                    allImages.push({
                        imageId: imageId,
                        path: route + '/' + tileset.image,
                        onload: ((function(tileset, imageId) {
                            return function(res) {
                                var baseTexture = res.texture.baseTexture;
                                var columns = tileset.columns;
                                var rows = tileset.tilecount/columns;
                                var tw = tileset.tilewidth;
                                var th = tileset.tileheight;
                                for(var col=0; col<columns; col++) {
                                    for(var row=0; row<rows; row++) {
                                        var size = new core.Rectangle(col*tw, row*th, tw, th);
                                        var texture = new core.Texture(baseTexture, size, size.clone(), null, false);
                                        core.utils.TextureCache[imageId] = texture;
                                    }
                                }
                            }
                        })(tileset, imageId))
                    });
                } else if(tileset.tiles) {
                    for(var id in tileset.tiles) {
                        var properties = tileset.tileproperties;
                        var image = tileset.tiles[id].image;
                        var imageId = properties && properties.imageId || image;
                        allImages.push({
                            imageId: imageId,
                            path: route + '/' + image
                        });
                    }
                }
            }
        }

        // add all images
        var loader = this;
        allImages.forEach(function(imageItem) {
            loader.add(imageItem.imageId, imageItem.path, loadOptions, function(res) {
                if(imageItem.onload) {
                    imageItem.onload(res);
                }
                if(++loaded === allImages.length) {
                    next();
                }
            });
        });

    };
};
