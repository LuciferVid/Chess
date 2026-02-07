import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Learn from './pages/Learn';
import King from './components/King';
import Queen from './components/Queen';
import Bishop from './components/Bishop';
import Knight from './components/Knight';
import Rook from './components/Rook';
import Pawn from './components/Pawn';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import bgVideo from './assets/bg-video.mp4';
import './App.css';

// Reset password component
const ResetPassword = () => (
  <div className="placeholder-page">
    <h1>Reset Password</h1>
    <p>Password reset functionality coming soon!</p>
  </div>
);

const App = () => {

// WIP