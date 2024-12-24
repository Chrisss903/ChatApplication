import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeBoard = () => {

    const navigate = useNavigate()


    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '20px',
        gap: '20px',
        marginTop: '10%'
    };

    const boxStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '35%',
        minWidth: '250px',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'  // Smooth transition for hover effect
    };


    const headingStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
    };

    const contentStyle = {
        fontSize: '16px',
        color: '#555',
    };

    // Function to handle hover effect
    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = '#90EE90';
        e.target.style.transform = 'scale(1.05)';
        e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    };

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = '#fff';
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    };

    const handleClick = () => {
        navigate("/FriendsList")
    }

    const handleRequest = () => {
        navigate("/Requests")
    }

    const handleIncomingRequests = () => {
        navigate("/IncomingFriendRequest")
    }

    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: '10px' }}>ChatSphere</h1>
            <div style={containerStyle}>

                <div
                    style={boxStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => { navigate("/MessageFront") }}
                >
                    <h2 style={headingStyle}>Message</h2>
                    <p style={contentStyle}>You have no new messages.</p>
                </div>

                <div
                    style={boxStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    <h2 style={headingStyle}>Friends Search</h2>
                    <p style={contentStyle}>Search New Friends and make New People</p>
                </div>

                <div
                    style={boxStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleRequest}
                >
                    <h2 style={headingStyle}>My friends</h2>
                    <p style={contentStyle}>Come and See you friends</p>
                </div>

                <div
                    style={boxStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <h2 style={headingStyle}>Posts Around the world</h2>
                    <p style={contentStyle}>See What's Trending around your Circle</p>
                </div>

                <div
                    style={boxStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleIncomingRequests}
                >
                    <h2 style={headingStyle}>My Requests</h2>
                    <p style={contentStyle}>You have new friend requests</p>
                </div>



            </div>
        </>
    );
};

export default HomeBoard;
