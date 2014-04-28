window.onload = function() {
    var chat = new(function() {
        this.messages = [];

        this.socket = io.connect('http://localhost:3700');

        this.userInputField = document.getElementById("userInput");

        this.content = document.getElementById("content");

        this.nameField = document.getElementById("name");

        this.sendButton = document.getElementById("send");

        this.socket.on('message', function (data) {
            if(data.message) {
                this.messages.push(data);

                //Adds new message to array of all messages and then display to the user
                var html = '';
                for(var i=0; i < this.messages.length; i++) {
                    html += '<b>' + this.messages[i].username + ': </b>';
                    html += this.messages[i].message + '<br />';
                }
                this.content.innerHTML = html;

                //Then scroll the user to the bottom of the content div
                this.content.scrollTop = this.content.scrollHeight;
            } else {
                //Generic error handling if the server responded without a message
                console.log("There is a problem:", data);
            }
        }.bind(this));

        this.sendButton.onclick = this.sendMessage = function() {
            if(this.nameField.value === '') {
                alert("Please type your name!");
            } else if (this.userInputField.value === '') {
                alert("Place enter some text!");
            } else {
                //Send an object with a message and username property to the server
                this.socket.emit('send', { message: this.userInputField.value, username: this.nameField.value });

                //Clear out the user's inputs and refocus them back on the input
                this.userInputField.value = "";
                this.userInputField.focus();
            }
        }.bind(this);

        this.userInputField.onkeyup = function(e){
            if(e.keyCode === 13){
                this.sendMessage();
            }
        }.bind(this);
    });
};