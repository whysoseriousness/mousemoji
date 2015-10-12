var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
io.on('connection', function(socket){
  socket.on('move', move);
	socket.on('chat', chat);
});

function move(mouse){
  io.emit('move', mouse);
  console.log(mouse);
}

function chat(message){
  io.emit('chat', message);
}

http.listen(process.env.PORT || 3000, function(){
	console.log('flags lifted on 3000 (80 in production)');
});
