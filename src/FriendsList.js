import React, { useState, useEffect } from 'react';  // Add useEffect import
import SearchBar from './searchBar';

function FriendsList() {
    // Lift friendRequests state up to FriendsList
    const [friendRequests, setFriendRequests] = useState({});

    console.log("this is friends request", friendRequests);


    useEffect(() => {
        console.log("Friend requests updated:", friendRequests);
    }, [friendRequests]);

    return (
        <div>
            <div>
                <SearchBar setFriendRequests={setFriendRequests} /> {/* Pass setter as prop */}
            </div>
        </div>
    );
}

export default FriendsList;
