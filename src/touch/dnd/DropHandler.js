function DropHandler(dndManager, target) {
    this.dndManager = dndManager;
    this.target = target;
    this.sessionStarted = false;
    this.canceled = false;
}

DropHandler.prototype.init = function() {};
DropHandler.prototype.destroy = function() {};

DropHandler.prototype.onDropMove = function(e) {
    this.sessionStarted = true;
    this.target.onDropMove(e);
    if(e.canceled) {
        this.canceled = true;
    }
};

DropHandler.prototype.onDrop = function(e) {
    if(!this.sessionStarted) {
        return;
    }
    if(this.canceled) {
        return;
    }
    this.target.onDrop(e);
};

DropHandler.prototype.onDragDropEnd = function() {
    if(!this.sessionStarted) {
        return;
    }
    if(this.canceled) {
        return;
    }
    this.target.onDragDropEnd();
    this.canceled = false;
};

module.exports = DropHandler;
