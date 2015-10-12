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

// Sockets
io.on('connection', function(socket){
    socket.on('move', move);
	socket.on('chat', chat);
});

function move(mouse){
    io.emit('move', mouse);
}

function chat(message){
    io.emit('chat', message);
}

http.listen(process.env.PORT || 1993, function(){
	console.log('flags lifted on 1993 (80 in production)');
});
