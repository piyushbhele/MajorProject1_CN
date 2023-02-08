module.exports.chatSockets = function (socketServer) {
    // let io = require('socket.io')(socketServer);

    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://18.179.22.49:8000",
            methods: ["GET", "POST"],
            transports: ['websocket', 'polling'],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        },
        allowEIO3: true
    });


    io.sockets.on('connection', function (socket) {
        console.log('new connection recived', socket.id);

        socket.on('disconnect', function () {
            console.log('socket disconnected');
        })

        socket.on('join_room', function (data) {
            console.log('joining request received', data);

            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data);
        })

        socket.on('send_message', function (data) {
            io.in(data.chatroom).emit('receive_message', data);
        });
    })
}