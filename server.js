var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

require('./server/config/sockets')(config, io);

http.listen(config.port, function(){
    console.log('Listening on port ' + config.port + '...');
});