import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './chatstyle.css';
const socket = io('http://localhost:8800', {
  withCredentials: false,
});

const Chat = ({ senderId = 12, receiverId = 21 }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // retrieve chat history from server
    socket.emit('get_chat_history', { senderId, receiverId });

    // receive chat history from server
    socket.on('chat_history', history => {
      setChatHistory(history);
    });

    return () => {
      //   cleanup;
      socket.off('chat_history');
      socket.off('message');
    };
  }, [senderId, receiverId]);

  const handleSendMessage = e => {
    e.preventDefault();

    // send message to server
    socket.emit('message', { senderId, receiverId, message });

    // add message to chat history
    setChatHistory(prevHistory => [
      ...prevHistory,
      { senderId, receiverId, message },
    ]);

    // clear input field
    setMessage('');
  };

  return (
    <div className='chat-container'>
      <ul className='chat-history'>
        {chatHistory.map((msg, index) => {
          console.log('sender is:', msg.sender_id, 'sender now', senderId);
          return (
            <li
              key={index}
              className={`chat-message ${
                msg.sender_id == senderId
                  ? 'sent'
                  : msg.sender_id
                  ? 'received'
                  : 'sent'
              }`}
            >
              {msg.message}
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleSendMessage} className='chat-input'>
        <input
          type='text'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};
export default Chat;
