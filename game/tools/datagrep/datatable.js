var fs = require('fs');
var fileData;

function getFileData(callback) {
    if(fileData) {
        callback && callback(fileData);
        return;
    }
    fs.readFile(__dirname + '/datatable/tables.json', function(err, data) {
        if(err) {
            callback && callback(null);
            return;
        }
        fileData = JSON.parse(data);
        callback && callback(fileData);
    });
}

function saveFileData(callback) {
    fs.writeFile(__dirname + '/datatable/tables.json', JSON.stringify(fileData, null, '  '), 'utf8', callback);
}

function findDataTable(id) {
    for(var i=0; i<fileData.length; i++) {
        var tableItem = fileData[i];
        if(tableItem.id === id) {
            return tableItem;
        }
    }
    return null;
}

function removeDataTable(id) {
    for(var i=0; i<fileData.length; i++) {
        var tableItem = fileData[i];
        if(tableItem.id === id) {
            fileData.splice(i, 1);
            return true;
        }
    }
    return false;
}

module.exports = {
    list: function(req, res) {
        getFileData(function(data) {
            res.setHeader('Content-Type', 'application/json');
            res.send({
                success: !!data,
                data: data
            });
        });
    },
    create: function(req, res) {
        fileData.push(req.body);
        saveFileData(function(err) {
            res.setHeader('Content-Type', 'application/json');
            res.send({
                success: !err,
                message: err
            });
        });
    },
    update: function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        var id = req.body.id;
        var tableItem = findDataTable(id);
        if(!tableItem) {
            res.send({
                success: false,
                message: 'table not found'
            });
            return;
        }
        tableItem.columns = req.body.columns;
        saveFileData(function(err) {
            res.send({
                success: !err,
                message: err
            });
        });
    },
    remove: function(req, res) {
        var id = req.body.id;
        var success = removeDataTable(id);
        res.setHeader('Content-Type', 'application/json');
        res.send({
            success: success
        });
    }
};
