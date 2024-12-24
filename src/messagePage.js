import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import axios from 'axios'

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBz61-wWTPPfFVH9lneqbpDq-JmlO9gSo",
    authDomain: "chat-application-cffe3.firebaseapp.com",
    projectId: "chat-application-cffe3",
    storageBucket: "chat-application-cffe3.firebasestorage.app",
    messagingSenderId: "943126504025",
    appId: "1:943126504025:web:028f0714d1ff7d62b9c748",
    measurementId: "G-L8FVMPWT8W"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function MessagePage() {
    const styles = {
        container: {
            maxWidth: "100%",
            margin: "20px auto",
            height: "90vh",
            border: "1px solid #e6e6e6",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        header: {
            backgroundColor: "lightblue", // WhatsApp green
            color: "#fff",
            padding: "15px",
            fontSize: "1.5rem",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        chatArea: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column-reverse',
            padding: "15px",
            overflowY: "auto",
            backgroundColor: "#f5f5f5",
        },
        message: {
            margin: "10px 0",
            maxWidth: "70%",
            padding: "10px 15px",
            borderRadius: "15px",
            wordWrap: "break-word",
            display: "inline-block",
        },
        messageSent: {
            backgroundColor: "#dcf8c6", // WhatsApp light green
            alignSelf: "flex-end",
        },
        messageReceived: {
            backgroundColor: "#fff",
            alignSelf: "flex-start",
        },
        footer: {
            display: "flex",
            alignItems: "center",
            padding: "10px 15px",
            backgroundColor: "#fff",
            borderTop: "1px solid #e6e6e6",
        },
        input: {
            flex: 1,
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "20px",
            outline: "none",
            marginRight: "10px",
        },
        button: {
            padding: "8px 15px",
            backgroundColor: "#25D366", // WhatsApp green
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "500",
        },
        timestamp: {
            fontSize: '12px',
            color: '#999',
            marginTop: '4px',
            textAlign: 'right', // Align to the right for sent messages
        },
    };

    const [messages, setMessages] = useState([]);
    const location = useLocation();
    const userId = localStorage.getItem("userID");
    const [messageInput, setMessageInput] = useState("");
    const name = location.state?.person || {};

    useEffect(() => {


        const getReceiverId = async () => {
            const response = await axios.get(`http://localhost:3000/getReceiverID?receiverName=${name}`)
            console.log(response.data)
            const receiverID = response.data.receiverID
            localStorage.setItem("receiverID", receiverID)
        }

        getReceiverId();

        const getMessages = async (receiverId) => {
            try {
                const response = await axios.get(`http://localhost:3000/getMessages/${receiverId}`);
                console.log("Messages:", response.data);


            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        getMessages(receiverID);

        const unsubscribe = onSnapshot(
            collection(db, "messages"),
            (snapshot) => {
                const newMessages = snapshot.docs
                    .map((doc) => doc.data())
                    .filter((msg) => msg.receiverId === userId || msg.senderId === userId);

                setMessages(newMessages.sort());
                console.log(messages)
            },
            (error) => console.error("Error listening to messages:", error)
        );

        return () => unsubscribe();
    }, [userId]);

    const receiverID = localStorage.getItem("receiverID")

    const sendMessage = async () => {
        if (messageInput.trim() !== "") {
            try {
                // Add message to Firestore
                await addDoc(collection(db, "messages"), {
                    senderId: userId,
                    receiverId: receiverID,
                    message: messageInput,
                    timestamp: new Date(),
                });

                setMessageInput('');  // Clear input after sending
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);  // seconds are in Firestore timestamp format
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={styles.container}>
            {/* Chat Header */}
            <div style={styles.header}>
                <span>Chat with {name.charAt(0).toUpperCase() + name.slice(1)}</span>
            </div>

            {/* Chat Area */}
            <div style={styles.chatArea}>
                {messages
                    .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)  // Sort by timestamp
                    .map((message, index) => {

                        return (
                            <div
                                key={index}
                                style={{
                                    ...styles.message,
                                    ...(message.senderId === userId
                                        ? styles.messageSent
                                        : styles.messageReceived),
                                }}
                            >
                                <div>{message.message}</div>
                                {/* Add timestamp */}
                                <div style={styles.timestamp}>
                                    {formatTimestamp(message.timestamp)}  {/* Use message.timestamp directly */}
                                </div>
                            </div>
                        );
                    })}
            </div>

            {/* Footer */}
            <div style={styles.footer}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    style={styles.input}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button style={styles.button} onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default MessagePage;
