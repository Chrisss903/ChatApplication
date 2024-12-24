import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    // State variables to store user input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!name || !email || !password) {
            setError('Please fill all fields!');
            return;
        }

        try {
            const user = { name, email, password }
            const response = await axios.post("http://localhost:3000/Signup", user);
            if (response.data.success) {
                console.log(response.data.user.id)
                localStorage.setItem('userID', response.data.user.id)
                console.log("Data is Sent");
                navigate("/home")
            }
        } catch (err) {
            console.log("Error:", err);
        }

    };


    return (
        <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '10%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Sign Up</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                        style={{ width: '100%', padding: '8px', margin: '8px 0', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        style={{ width: '100%', padding: '8px', margin: '8px 0', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        style={{ width: '100%', padding: '8px', margin: '8px 0', borderRadius: '4px' }}
                    />
                </div>

                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
