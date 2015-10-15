var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var connectedClients = [];

// Routes
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');	
});

app.get('/EmailForm.js', function(req, res){
  res.sendFile(__dirname + '/EmailForm.js');    
});

app.get('/Chat.js', function(req, res){
  res.sendFile(__dirname + '/Chat.js');    
});

app.get('/Mouse.js', function(req, res) {
	res.sendFile(__dirname + '/Mouse.js');
});

// Sockets
io.on('connection', function(socket) {
  var sId = socket.client.conn.id;
  connectedClients.push(sId);

  io.emit('join', {"sId" : sId});

  socket.on('move', move);
	socket.on('chat', chat);
  socket.on('disconnect', disconnect);
});

function disconnect(socket) {
  console.log(socket);
}

function move(mouse) {
  if (connectedClients.indexOf(mouse.sId) > -1) {
    io.emit('move', mouse);
  }
}

function chat(message){
  io.emit('chat', message);
}

http.listen(process.env.PORT || 3000, function(){
	console.log('flags lifted on 3000 (80 in production)');
});
