import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Header({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Pets-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {!isAuthenticated && <Nav.Link href="/login">Login</Nav.Link>}
            {isAuthenticated && <Nav.Link href='/create'>Create Pet</Nav.Link>}
          </Nav>
          {isAuthenticated && (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          )}
  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
