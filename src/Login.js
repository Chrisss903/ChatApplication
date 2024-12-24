import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const handleLogin = async () => {
            if (email && password) {
                try {
                    const dataUser = { email, password }
                    const response = await axios.post("http://localhost:3000/Login", dataUser);
                    if (response.data) {
                        console.log(response.data)
                        localStorage.setItem("userID", response.data.userId)
                        navigate('/home')
                    }

                }
                catch (err) {
                    console.log("Error Occured", err)
                }
            }
        }

        handleLogin()

    }

    useEffect(() => {
        localStorage.clear()
    }, [])

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
    };

    const formContainerStyle = {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    };

    const headingStyle = {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '15px',
    };


    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#0056b3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const buttonHoverStyle = {
        backgroundColor: '#004494',
    };


    const toggleButtonStyle = {
        backgroundColor: 'transparent',
        color: '#0056b3',
        border: 'none',
        textDecoration: 'underline',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'color 0.3s',
    };

    const toggleButtonHoverStyle = {
        color: '#004494',
    };

    const handleClick = () => {
        navigate("/Signup")
    }

    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <h1 style={headingStyle}>{'Login'}</h1>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                    >
                        Login
                    </button>
                </form>
                <button

                    style={toggleButtonStyle}
                    onMouseEnter={(e) => (e.target.style.color = toggleButtonHoverStyle.color)}
                    onMouseLeave={(e) => (e.target.style.color = toggleButtonStyle.color)}
                    onClick={handleClick}
                >
                    Don't have Account Signup
                </button>
            </div>
        </div>
    );
}

export default HomePage;
