//Libraries we will use
var express = require("express");
var exphbs  = require('express3-handlebars');

//App Setup
var app = express();
var port = 3700;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Defining our Routes
app.get("/", function(req, res){
    res.render('index');
});

//Sets the static directory for files that will be rendered to the client as is
app.use(express.static(__dirname + '/public'));

//Starts running the app using socket.io
var io = require('socket.io').listen(app.listen(port));

//For each connection
io.sockets.on('connection', function (socket) {

    //Send them a message welcoming them to the chat
    socket.emit('message', { message: 'Welcome to the chat. Play nice!', username: 'Server' });

    //And each time you receive a send, emit it to everyone
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});