import React, { useEffect, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom';
import { GetPetById } from '../services/petService';
import { Container, Row, Col, Card, Spinner, Alert , Button  } from 'react-bootstrap';


export default function PetDetails() {

  const [pet, setPet] = useState(null);
  const [loading, setLoadgin] = useState(true);
  const [error, setError] = useState(null);


  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const data = await GetPetById(id);
        setPet(data);
      } catch (error) {
        setError("Failed to fetch pet" + error);
      } finally {
        setLoadgin(false);
      }
    }
    fetchPetDetails();
  }, [id]);

  if (loading) return <Spinner animation='border' role='status'>
    <span className='visually-hidden'> Loading...</span>
  </Spinner>;

  if (error) return <Alert variant='danger'>{error}</Alert>;

  return (
    <div>
      <Container className='mt-5'>
        <Button variant='secondary' onClick={() => navigate('/')} className='mb-3'>
          Back
        </Button>
        {pet && (<Card>
          <Card.Img variant='top' src={pet.picUrl} height={450} width={300} />
          <Card.Body>
            <Card.Title>{pet.name}</Card.Title>
            <Card.Text>
              <Row>
                <Col md={6}>
                  <p><strong>Category:</strong>{pet.category}</p>
                  <p><strong>Weight:</strong>{pet.weight} kg</p>
                  <p><strong>Age:</strong>{pet.age} years</p>
                </Col>
                <Col md={6}>
                  <p><strong>Adopted:</strong>{pet.isAdopted ? ' Yes' : ' No'}</p>
                  {pet.isAdopted && <p><strong>Adopter's Name:</strong>{pet.AdopterName}</p>}
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>)}
      </Container>
    </div>
  )
}