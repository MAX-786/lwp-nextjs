/* eslint-disable @typescript-eslint/no-require-imports */
/** Description: This file is the entry point of the application.
 * It creates a server using the http module and listens on port 3000.
 * It also creates a socket.io server and listens for connections on it.
 * When a user connects, it logs a message to the console and listens for messages from the user.
 * When a message is received, it emits the message to all connected users.
 * When a user disconnects, it logs a message to the console. **/

const createServer = require("http").createServer;
const { Server } = require("socket.io");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("user-message", (message) => {
      io.emit("message", {text: message.text, id: socket.id});
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
