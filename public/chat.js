window.onload = function() {
    var messages = [],
    socket = io.connect('http://localhost:3700'),
    field = document.getElementById("field"),
    sendButton = document.getElementById("send"),
    content = document.getElementById("content"),
    name = document.getElementById("name"),
    sendMessage;

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);

            //Adds new message to array of all messages and then display to the user
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + messages[i].username + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;

            //Then scroll the user to the bottom of the content div
            content.scrollTop = content.scrollHeight;
        } else {
            //Generic error handling if the server responded without a message
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = sendMessage = function() {
        //Don't let them submit unless they have given us a name and some text
        if(name.value === '') {
            alert("Please type your name!");
        } else if (field.value === '') {
            alert("Place enter some text!");
        } else {
            //Send an object with a message and username property to the server
            socket.emit('send', { message: field.value, username: name.value });

            //Clear out the user's inputs and refocus them back on the input
            field.value = "";
            field.focus();
        }
    };

    field.onkeyup = function(e){
        if(e.keyCode === 13){
            sendMessage();
        }
    }

};