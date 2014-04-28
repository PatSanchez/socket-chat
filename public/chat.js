window.onload = function() {
    var Chat = new(function() {

        this.messages = [];
        this.users = '';
        this.userInputField = document.getElementById('userInput');
        this.content = document.getElementById('content');
        this.nameField = document.getElementById('name');
        this.setNameButton = document.getElementById('setName');
        this.sendButton = document.getElementById('send');
        this.loginDialog = document.getElementById('preLogin');
        this.chatScreen = document.getElementById('postLogin');
        this.userList = document.getElementById('userList');

        this.setNameButton.onclick = this.setName = function(){
            if(this.nameField.value === '') {
                alert('Please type your name!');
            } else {
                this.initChat();
            }
        }.bind(this);

        this.nameField.onkeyup = function(e){
            if(e.keyCode === 13){
                this.setName();
            }
        }.bind(this);

        this.initChat = function(){
            this.socket = io.connect('http://localhost:3700');

            //When a new userlist is sent over, repopulate the client side list
            this.socket.on('updateUsers', function(data){
                this.users = data;
                var html = '';
                for(var i=0; i < this.users.length; i++) {
                    html += this.users[i] + '</br>';
                }
                this.userList.innerHTML = html;
            }.bind(this));

            this.socket.on('message', function (data) {
                if(data.message) {
                    this.messages.push(data);

                    //Adds new message to array of all messages and then display to the user
                    var html = '';
                    for(var i=0; i < this.messages.length; i++) {
                        if (this.messages[i].username){
                            html += '<b>' + this.messages[i].username + ': </b>';
                        }
                        html += this.messages[i].message + '<br />';
                    }
                    this.content.innerHTML = html;

                    //Then scroll the user to the bottom of the content div
                    this.content.scrollTop = this.content.scrollHeight;
                } else {
                    //Generic error handling if the server responded without a message
                    console.error('There is a problem:', data);
                }
            }.bind(this));

            this.sendButton.onclick = this.sendMessage = function() {
                if(this.nameField.value === '') {
                    alert('Please type your name!');
                } else if (this.userInputField.value === '') {
                    alert('Place enter some text!');
                } else {
                    //Send an object with a message and username property to the server
                    this.socket.emit('send', { message: this.userInputField.value, username: this.nameField.value });

                    //Clear out the user's inputs and refocus them back on the input
                    this.userInputField.value = '';
                    this.userInputField.focus();
                }
            }.bind(this);

            this.userInputField.onkeyup = function(e){
                if(e.keyCode === 13){
                    this.sendMessage();
                }
            }.bind(this);

            this.loginDialog.className = 'chatPart';
            this.chatScreen.className = 'chatPart visible';

            //Log In The User
            this.socket.emit('login', {username: this.nameField.value });
        }.bind(this);


    });



};