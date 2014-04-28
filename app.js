//<editor-fold desc="Libraries">
var express = require("express");
var exphbs  = require('express3-handlebars');
//</editor-fold>

//<editor-fold desc="App Setup">
var app = express();
var port = 80;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//</editor-fold>

//<editor-fold desc="Routes">
app.get("/", function(req, res){
    res.render('index');
});
//</editor-fold>

//<editor-fold desc="Start the App">
app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(port));
//</editor-fold>

//<editor-fold desc="Application Logic">
var users = [];

io.sockets.on('connection', function (socket) {

    //Send them a message welcoming them to the chat. Only goes to the new user (note not using io.sockets but socket)
    socket.emit('message', { message: 'Welcome to the chat. Play nice!'});

    //When someone logs in, send a message to everyone and tell them to update their users list
    socket.on('login', function(data){
        socket.username = data.username;
        users.push(data.username);
        io.sockets.emit('message', { message: '<em>' + socket.username + '</em> has joined the chat!'});
        io.sockets.emit('updateUsers', users);
    });

    //And each time you receive a send, emit it to everyone
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });

    //When someone leaves, send a message to everyone and tell them to update their users lists
    socket.on('disconnect', function(){
        var index = users.indexOf(socket.username);
        if (index > -1) {
            users.splice(index, 1);
        }
        io.sockets.emit('message', { message: '<em>' + socket.username + '</em> has left the chat'});
        io.sockets.emit('updateUsers', users);
    });
});
//</editor-fold>