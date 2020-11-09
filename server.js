require("dotenv").config();
const express = require('express')
const http = require('http')
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);
const path = require("path");

const rooms = {};
const socketToRoom = {};


io.on("connection", socket => {
  socket.on("join room", roomID => {
    if (rooms[roomID]) {
      const length = rooms[roomID].length;
      // if (length === 4) {
      //   socket.emit("room full");
      //   return;
      // }
      rooms[roomID].push(socket.id);
    } else {
      rooms[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = rooms[roomID].filter(id => id !== socket.id);

    socket.emit("all users", usersInThisRoom);

  });
  socket.on("sending signal", payload => {
    io.to(payload.userToSignal).emit('user joined', {
      signal: payload.signal,
      callerID: payload.callerID
    });
  });

  socket.on("returning signal", payload => {
    io.to(payload.callerID).emit('receiving returned signal', {
      signal: payload.signal,
      id: socket.id
    });
  });

  socket.on('disconnect', () => {
    const roomID = socketToRoom[socket.id];
    let room = rooms[roomID];
    if (room) {
      room = room.filter(id => id !== socket.id);
      rooms[roomID] = room;
    }
  });
});

if (process.env.PROD) {
  app.use(express.static(path.join(__dirname, './client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });
}

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`server is running on port ${port}`));