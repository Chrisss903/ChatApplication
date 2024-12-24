// src/components/MyFriends.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const MyFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the friends data when the component mounts
    const fetchFriends = async () => {
      try {
        const userId = localStorage.getItem("userID")
        console.log(userId)
        const response = await axios.get(`http://localhost:3000/friends?userId=${userId}`); // Adjust the API endpoint as needed
        console.log(response.data)
        setFriends(response.data?.FriendData || response.data?.getFriendName);
      } catch (err) {
        setError('Error fetching friends data');
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <Container>
      <Heading>My Friends</Heading>
      <List>
        {friends.map((friend, index) => (
          <Card key={index}>
            <Info>
              <h3>{friend}</h3>
            </Info>
          </Card>
        ))}
      </List>
    </Container>
  );
};

// Styled-components

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Card = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Info = styled.div`
  font-size: 1.2rem;
  color: #333;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #ff0000;
  padding: 2rem;
`;

const Error = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #ff4c4c;
  padding: 2rem;
`;

export default MyFriends;
