const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const multer = require('multer');
const path = require('path');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static('public'));


const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  
  },
});
const upload = multer({ storage });


app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });  
});


const users = {};
const messageHistory = [];  


io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.emit('messageHistory', messageHistory);

  socket.on('setUsername', (username) => {
    if (!username || username.trim() === "") return;  
    users[socket.id] = username;  
    io.emit('usersOnline', Object.values(users));  
    const joinMessage = { username: 'System', message: `${username} has joined the chat.` };
    messageHistory.push(joinMessage);  
    io.emit('message', joinMessage);  
  });

  
  socket.on('message', (data) => {
    if (!users[socket.id]) return;  
    messageHistory.push(data);  
    io.emit('message', data);  
  });

  
  socket.on('image', (data) => {
    if (!users[socket.id]) return;  
    messageHistory.push(data);  
    io.emit('image', data); 
  });

  
  socket.on('disconnect', () => {
    const username = users[socket.id];  
    if (username) {
      const leaveMessage = { username: 'System', message: `${username} has left the chat.` };
      messageHistory.push(leaveMessage);  
      io.emit('message', leaveMessage);  
    }
    delete users[socket.id];  
    io.emit('usersOnline', Object.values(users));  
    console.log('A user disconnected:', socket.id);
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
