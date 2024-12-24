import React, { useState, useEffect } from 'react';
import { FaEnvelope } from 'react-icons/fa'; // Importing an envelope icon for messaging
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MessageComponent() {
    const styles = {
        container: {
            maxWidth: '100%',
            margin: '20px auto',
            padding: '20px',
            border: '1px solid #e6e6e6',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        title: {
            fontSize: '1.8rem',
            marginBottom: '20px',
            textAlign: 'center',
            color: '#075E54', // WhatsApp green
            fontWeight: '600',
        },
        list: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
        listItem: {
            display: 'flex',
            alignItems: 'center',
            padding: '15px 10px',
            borderBottom: '1px solid #ddd',
            transition: 'background-color 0.3s',
            cursor: 'pointer',
        },
        listItemHover: {
            backgroundColor: '#f1f1f1',
        },
        avatar: {
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#25D366', // WhatsApp green
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            color: '#fff',
            marginRight: '15px',
        },
        name: {
            flex: 1,
            fontSize: '1.2rem',
            color: '#333',
            fontWeight: '500',
        },
        button: {
            backgroundColor: '#25D366',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#1da851',
        },
        icon: {
            fontSize: '1.2rem',
        },
    };

    const [persons, setPersons] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const handleFriends = async () => {
            const userID = localStorage.getItem('userID');
            const response = await axios.get(`http://localhost:3000/getFriends?userId=${userID}`);
            console.log(response.data)
            setPersons(response.data?.FriendData || response.data?.getFriendName);
            localStorage.removeItem("receiverID")
        };

        handleFriends();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Messages</h2>
            <ul style={styles.list}>
                {persons?.map((person, index) => (
                    <li
                        key={index}
                        style={styles.listItem}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.listItemHover.backgroundColor)}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                        <div style={styles.avatar}>{person[0].toUpperCase()}</div>
                        <span style={styles.name}>{person}</span>
                        <button
                            style={styles.button}
                            aria-label={`Message ${person}`}
                            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                            onClick={() => navigate("/messagePage", { state: { person } })}
                        >
                            <FaEnvelope style={styles.icon} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MessageComponent;
