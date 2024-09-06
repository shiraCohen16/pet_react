import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { loginUser } from '../services/userService';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      
      const response = await loginUser({ Email: email, UserPassword: password });
      onLogin(response.accessToken);
      setSuccess(response.message);
      setTimeout(() => navigate('/'), 1500);
      sessionStorage.setItem("userId", response.foundUser._id);

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="login-container">
    <h2 className="my-4 text-center">Login</h2>
    {error && <Alert variant="danger">{error}</Alert>}
    {success && <Alert variant="success">{success}</Alert>}
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mt-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-4 w-100">
        Login
      </Button>
      <div className="mt-3 text-center">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </Form>
  </Container>
  );
}