"use client";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import styles from "./page.module.css";

let socket: Socket;

type Message = {
  text: string;
  id: string;
};

const ChatPage = () => {
  const [message, setMessage] = useState<Message>({ text: "", id: "" });
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    socket = io();
    
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);
  
  const sendMessage = () => {
    setUserId(socket.id || null);
    if (message.text.trim() !== "") {
      setMessage({ text: message.text, id: socket.id ||  "unknown-user" });
      socket.emit("user-message", message);
      setMessage({text: "", id: ""});
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Live Chat</h1>
      </header>

      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${userId === msg.id ? styles.own: null}` } // Remove ${styles.own} if differentiating users
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={message.text}
            onChange={(e) => setMessage({ text: e.target.value, id: "" })}
            onKeyUp={handleKeyPress}
            className={styles.input}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;