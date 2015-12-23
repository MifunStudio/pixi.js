var prefix = 'PIXI_hashCode_';
var id = 1;

Object.defineProperties(Object.prototype, {
    hashCode: {
        get: function() {
            if(!this.__pixi_hashCode) {
                this.__pixi_hashCode = prefix + (id++);
            }
            return this.__pixi_hashCode;
        }
    }
});
