const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', function (socket) {
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data});

    })
    console.log('connected');
});

io.on('user-disconnected',function(){
    io.emit("user-disconnected",socket.id);
})


app.get('/', function (req, res) {
    res.render('index');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(``);
});
