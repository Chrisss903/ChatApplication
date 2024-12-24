import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from "./Signup";
import HomeBoard from "./HomeBoard";
import FriendsList from "./FriendsList";
import Requests from "./Requests"
import IncomingFriendRequests from "./IncomingFriendRequests";
import MessageComponent from "./messageFront";
import MessagePage from "./messagePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/home" element={<HomeBoard />} />
        <Route path="/FriendsList" element={<FriendsList />} />
        <Route path="/Requests" element={<Requests />} />
        <Route path="/IncomingFriendRequest" element={<IncomingFriendRequests />} />
        <Route path="/MessageFront" element={<MessageComponent />} />
        <Route path="/messagePage" element={<MessagePage />} />
      </Routes>
    </Router>
  )
}
export default App;