var path = require('path');
var express = require('express');
var app = express();

app.use('/client', express.static(__dirname + '/client'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});
