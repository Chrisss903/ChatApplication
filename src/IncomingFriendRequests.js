import React, { useEffect, useState } from 'react';
import axios from 'axios';

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#f4f7fb',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center',
    },
    noRequests: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#aaa',
    },
    requestList: {
        listStyleType: 'none',
        padding: '0',
    },
    requestItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    requestText: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#333',
    },
    buttonsContainer: {
        display: 'flex',
        gap: '10px',
    },
    button: {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
    },
    rejectButton: {
        backgroundColor: '#F44336',
        color: '#fff',
    },
};

function IncomingFriendRequests() {
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const userId = localStorage.getItem("userID")
                const response = await axios.get(`http://localhost:3000/Requests?userId=${userId}`);
                console.log(response)
                if (response.data.success) {
                    console.log(response.data.RequestFriendNames)
                    setFriendRequests(response?.data?.RequestFriendNames);
                    console.log(friendRequests)
                }
            } catch (error) {
                console.error('Error fetching friend requests:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleAccept = async (name) => {
        try {
            const userId = localStorage.getItem("userID")
            const response = await axios.post(`http://localhost:3000/AcceptRequest`, { userId, name });
            if (response.data.success) {
                setFriendRequests(response.data.remainUserData);
            }
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleReject = async (name) => {
        try {
            const userId = localStorage.getItem("userID")
            const response = await axios.post(`http://localhost:3000/RejectRequest`, { userId, name });
            if (response.data.success) {
                console.log("success")
            }
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>Incoming Friend Requests</div>
            {friendRequests?.length === 0 ? (
                <div style={styles.noRequests}>No new requests</div>
            ) : (
                <ul style={styles.requestList}>
                    {friendRequests?.map((req, index) => (
                        <li key={index} style={styles.requestItem}>
                            <div style={styles.requestText}>{req}</div>
                            <div style={styles.buttonsContainer}>
                                {<>
                                    <button
                                        onClick={() => handleAccept(req)}
                                        style={{ ...styles.button, ...styles.acceptButton }}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(req)}
                                        style={{ ...styles.button, ...styles.rejectButton }}
                                    >
                                        Reject
                                    </button>

                                </>}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default IncomingFriendRequests;
