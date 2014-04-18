var express = require("express");
var exphbs  = require('express3-handlebars');

var app = express();
var port = 3700;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get("/", function(req, res){
    res.render('index');
});

//Sets the static directory for files that will be rendered to the client as is
app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to the chat. Play nice!', username: 'Server' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});