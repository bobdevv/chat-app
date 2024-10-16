const socket = io(); 
const messages = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const imageInput = document.getElementById('image-input');
const usersBar = document.getElementById('users-bar');  

let username = '';

do {
  username = prompt('Enter your username:');
} while (!username.trim());  

socket.emit('setUsername', username);

function appendMessage(username, text, isImage = false) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');

  if (isImage) {
    const img = document.createElement('img');
    img.src = text;
    messageElement.appendChild(img);
  } else {
    if (username === 'System') {
      messageElement.classList.add('system-message'); 
    }
    messageElement.textContent = `${username}: ${text}`;
  }

  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;  
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();  

  const message = messageInput.value.trim();  

  if (message) {
    socket.emit('message', { username, message });
    messageInput.value = '';  
  }

  if (imageInput.files[0]) {
    const formData = new FormData();
    formData.append('image', imageInput.files[0]);

  
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        socket.emit('image', { username, imageUrl: data.imageUrl });  
      });

    imageInput.value = '';  
  }
});


socket.on('messageHistory', (history) => {
  history.forEach((data) => {
    if (data.imageUrl) {
      appendMessage(data.username, data.imageUrl, true);  
    } else {
      appendMessage(data.username, data.message); 
    }
  });
});


socket.on('message', (data) => {
  appendMessage(data.username, data.message);  
});


socket.on('image', (data) => {
  appendMessage(data.username, data.imageUrl, true); 
});


socket.on('usersOnline', (users) => {
  usersBar.textContent = `Users Online: ${users.join(', ')}`;  
});
