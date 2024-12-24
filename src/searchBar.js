import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar({ setFriendRequests }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [FriendResults, setFriendResults] = useState([]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery.trim() !== '') {
                handleSearch();
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleSearch = async () => {
        try {
            const userId = localStorage.getItem('userID');
            const res = await axios.get(`http://localhost:3000/searchfriends?name=${searchQuery}&id=${userId}`);
            console.log(res.data);
            setSearchResults(res?.data?.users || []);
            setFriendResults(res?.data?.FriendInfo?.FriendName || []);
        } catch (err) {
            console.error('Error fetching search results:', err);
        }
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSendRequest = async (data) => {
        const username = data.name;
        try {
            const userId = localStorage.getItem('userID');
            const response = await axios.post(`http://localhost:3000/sendRequest?name=${username}&userId=${userId}`);
            if (response.data.success) {
                setFriendRequests(response.data.friendRequest);
                const btn = document.getElementById(`btn-${username}`);
                if (btn) {
                    btn.textContent = 'Request Sent';
                    btn.disabled = true;
                    btn.style.backgroundColor = 'yellow';
                    btn.style.color = 'black';
                }
            }
        } catch (err) {
            console.error('Error sending request:', err);
        }
    };

    const styles = {
        container: {
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        input: {
            width: '100%',
            height: '40px',
            padding: '0 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            marginBottom: '20px',
            fontSize: '16px',
            transition: 'border-color 0.3s ease',
        },
        resultsContainer: {
            listStyle: 'none',
            padding: '0',
            margin: '0',
        },
        resultItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            marginBottom: '10px',
            borderBottom: '1px solid #f0f0f0',
        },
        resultName: {
            fontSize: '16px',
            color: '#333',
        },
        button: {
            backgroundColor: 'blue', // light green in hex code
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            fontSize: '14px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonDisabled: {
            backgroundColor: '#ddd',
            cursor: 'not-allowed',
        },
        buttonAlreadyFriend: {
            backgroundColor: '#28a745', // Green background
            color: '#fff', // White text
            border: '1px solid #28a745', // Border to match the background
            padding: '8px 16px',
            fontSize: '14px',
            borderRadius: '4px',
            cursor: 'not-allowed', // Indicating it’s disabled
            transition: 'background-color 0.3s ease',
            pointerEvents: 'none', // Preventing interaction
        },

    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Search friends"
                style={styles.input}
            />

            <ul style={styles.resultsContainer}>
                {searchResults.map((data, index) => {
                    const isFriendNow = FriendResults.includes(data.name); // Compare against the list of friends

                    return (
                        <li key={index} style={styles.resultItem}>
                            <span style={styles.resultName}>{data.name}</span>
                            <button
                                id={`btn-${data.name}`}
                                onClick={() => handleSendRequest(data)}
                                style={isFriendNow ? styles.buttonAlreadyFriend : styles.button}
                                disabled={isFriendNow}
                            >
                                {isFriendNow ? 'Already Friend' : 'Send Request'}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default SearchBar;
