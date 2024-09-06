import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { CreatePetfunc, GetAllCategories } from '../services/petService';
import { useNavigate } from 'react-router-dom';

export default function CreatePet() {
  const [petData, setPetData] = useState({
    name: '',
    category: '',
    weight: '',
    age: '',
    picUrl: '',
    userId: sessionStorage.getItem('userId') || ''
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await GetAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        setMessage(`Error fetching categories: ${error}`);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {      
      const result = await CreatePetfunc(petData);
      setMessage(`Pet created successfully: ${result.pet.name}`);
      setPetData({
        name: '',
        category: '',
        weight: '',
        age: '',
        picUrl: '',
        userId: sessionStorage.getItem('userId') || ''
      });

     setTimeout(() => {
      navigate('/');
     }, 1500); 
    } catch (error) {
      setMessage(`Error creating pet: ${error}`);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Create New Pet</h2>
      {message && <Alert variant={message.startsWith('Error') ? 'danger' : 'success'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={petData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Category:</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={petData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category}>
                {category}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formWeight">
          <Form.Label>Weight:</Form.Label>
          <Form.Control
            type="text"
            name="weight"
            value={petData.weight}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAge">
          <Form.Label>Age:</Form.Label>
          <Form.Control
            type="text"
            name="age"
            value={petData.age}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPicUrl">
          <Form.Label>Picture URL:</Form.Label>
          <Form.Control
            type="text"
            name="picUrl"
            value={petData.picUrl}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Pet
        </Button>
      </Form>
    </Container>
  );
}