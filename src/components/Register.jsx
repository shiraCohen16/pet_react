import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { registerUser } from '../services/userService';

export default function Register() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // initialize 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userData = {
        Email: email.toLowerCase(),
        UserName: userName,
        PhoneNumber: phoneNumber,
        UserPassword: password
      };
      const response = await registerUser(userData);
      if (response) {
        setSuccess("Registration successful! Redirecting to Login ...");
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError("Registration Failed. Please try again");
      }
    } catch (err) {
      setError(err.message || "Network Error");
    }
  };

  return (
<Container className="register-container">
      <h2 className="my-4 text-center">Register</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      {success && <Alert variant='success'>{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email' className='mb-3'>
          <Form.Label>Email: </Form.Label>
          <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId='userName' className='mb-3'>
          <Form.Label>User Name: </Form.Label>
          <Form.Control type='text' value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId='phoneNumber' className='mb-3'>
          <Form.Label>Phone Number: </Form.Label>
          <Form.Control type='tel' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId='password' className='mb-3'>
          <Form.Label>Password: </Form.Label>
          <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId='confirmPassword' className='mb-3'>
          <Form.Label>Confirm Password: </Form.Label>
          <Form.Control type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </Form.Group>
        <Button type='submit' className="w-100">Register</Button>
      </Form>
    </Container>
  );
}
