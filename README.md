socket-chat
===========

Goal
-----

The Goal of this project is merely to provide a simple demo of how to use Socket.IO to create a chat client. This is not
intended for production use and much of the code is messy for the sake of showing concepts.

Installation
-------------------

npm install in the project directory  

You will need to modify app.js and public/chat.js to develop locally. Set which port you want to use in app.js and in
public/chat.js this.socket = io.connect('http://localhost:yourport');

node app to start

Homework
---------

Interested in picking this up on your own? Here's a few tasks that should be fun to do:  

* Add a "message history" of the last 10 messages that gets sent to new users that join the channel
* Add the ability to have multiple channels
* Allow users to private message each other
* Convert the frontend code to use Handlebars
* Allow users to change their names and broadcast a messaage when they do so
* Create an "Operator" role given to the channel creator or chosen randomly if no Operator exists. This role has the
  ability to squelch other users.