import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <Container>
        <Row>
          <Col md="4">
            <h5>About Us</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          </Col>
          <Col md="4">
            <h5>Contact</h5>
            <p>Email: example@example.com</p>
            <p>Phone: +123 456 789</p>
          </Col>
          <Col md="4">
            <h5>Follow Us</h5>
            <a href="#" className="text-white">Facebook</a><br />
            <a href="#" className="text-white">Twitter</a><br />
            <a href="#" className="text-white">Instagram</a>
            </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}