import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AllPets from './components/Allpets';
import PetDetails from './components/PetDetails';
import Login from './components/Login';
import Register from './components/Register';
import CreatePet from './components/CreatePet';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('accessToken'));

  useEffect(() => {
    setIsAuthenticated(!!sessionStorage.getItem('accessToken'));
  }, []);

  const handleLogin = (token) => {
    sessionStorage.setItem('accessToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={isAuthenticated ? <AllPets /> : <Navigate to="/login" />} />
        <Route path="/pet/:id" element={isAuthenticated ? <PetDetails /> : <Navigate to="/login" />} />
        <Route path="/create" element={isAuthenticated ? <CreatePet /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
}