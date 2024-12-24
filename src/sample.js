import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:3000");

const App = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [recipient, setRecipient] = useState('');
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        // Emit the username when the component mounts
        if (username) {
            socket.emit('setUsername', username);
        }

        socket.on('receiveMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [username]);

    // Send a private message to a specific user
    const sendMessage = () => {
        if (recipient) {
            socket.emit('sendMessage', message, recipient);
            setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
            setMessage('');
        }
    };

    const handleSetUsername = () => {
        if (username) {
            socket.emit('setUsername', username);
        }
    };

    return (
        <div>
            <h1>Private Chat App</h1>

            {/* Set username */}
            <div>
                {!username ? (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button onClick={handleSetUsername}>Set Username</button>
                    </div>
                ) : (
                    <div>
                        <p>Welcome, {username}!</p>
                        <div>
                            <input
                                type="text"
                                placeholder="Recipient's Username"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Type a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button onClick={sendMessage}>Send Message</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Display messages */}
            <div>
                <h3>Messages:</h3>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
