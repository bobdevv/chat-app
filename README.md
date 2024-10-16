

# Chat App

A real-time web-based chat application with image sharing functionality, styled in a retro aesthetic. Users can join the chat with a custom username, send text messages or images, and view the online users in a title bar. The app also displays system messages for user joins/leaves and maintains message history.

## Features

- **Real-time Communication:** Send and receive messages instantly using WebSockets (`socket.io`).
- **Image Upload:** Share images in the chat using the built-in image uploader.
- **Usernames:** Each user is prompted to enter a unique username when joining the chat.
- **System Notifications:** The app broadcasts system messages when users join or leave.
- **Online Users Display:** A live count of online users is shown in the title bar, with usernames separated by commas.
- **Message History:** When a new user joins, they receive the chat’s message history.
- **Responsive Design:** Optimized for both desktop and mobile devices with a retro-styled UI.
  
## Tech Stack

- **Backend:** Node.js, Express
- **Real-time Communication:** Socket.IO
- **Frontend:** HTML, CSS (retro style), JavaScript
- **File Uploads:** Multer (for image handling)

## Screenshots

![image](https://github.com/user-attachments/assets/dd73d802-568f-4d0a-8faf-09b6d2969e12)


## Installation

To run this project locally, follow these steps:

### Prerequisites

- **Node.js** (version 14.x or later)
- **npm** (version 6.x or later)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/retro-chat-app.git
   cd retro-chat-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## File Structure

```
retro-chat-app/
├── public/
│   ├── uploads/               # Stores uploaded images
│   ├── index.html             # Main HTML file for the chat interface
│   ├── style.css              # CSS for retro styling
│   ├── script.js              # Client-side JavaScript (handling sockets and interactions)
├── server.js                  # Main server file (handles sockets, image uploads, etc.)
├── package.json               # Project dependencies and scripts
└── README.md                  # Project README file
```

## Usage

- When a user joins, they are prompted to enter a username.
- Users can send text messages by typing in the message input and hitting "Send".
- To share an image, select an image from your local device and hit "Send".
- The system will automatically broadcast a message when a user joins or leaves the chat.
- The list of online users is updated in the top title bar in real time.

## Deployment

### To deploy on a platform like Heroku:

1. Set up a new project on [Heroku](https://www.heroku.com/).
2. Push the repository to Heroku:

   ```bash
   git push heroku master
   ```

3. Ensure environment variables are correctly configured (if applicable).

4. Open your app in the browser:

   ```
   heroku open
   ```

## Roadmap

Potential future improvements:

- **Private Messaging:** Allow users to send direct messages to each other.
- **Typing Indicator:** Display a "user is typing..." indicator for active typing.
- **File Sharing:** Extend image sharing to allow file sharing.
- **Themes:** Add support for switching between multiple themes (e.g., dark mode, light mode).

## Contributing

If you'd like to contribute to this project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add a new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---
