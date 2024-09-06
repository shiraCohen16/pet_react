import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { GetAllPets } from '../services/petService';
import { useNavigate } from 'react-router-dom';

export default function AllPets() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(null);
    const [countdown, setCountdown] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const newData = await GetAllPets();
                setData(newData);
            } catch (error) {
                setError('Failed to fetch pets');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const handleCardClick = (pet) => {
        setAlert(`You clicked on ${pet.name}. Redirecting in ${countdown} seconds...`);

        const interval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(interval);
                    navigate(`/pet/${pet._id}`);
                    return 0;
                }
                setAlert(`You clicked on ${pet.name}. Redirecting in ${prevCountdown - 1} seconds...`);
                return prevCountdown - 1;
            });
        }, 1000);
    };

    if (loading) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!data.length) return <Alert variant="warning">No pets available</Alert>;

    return (
        <Container className="mt-5">
            {alert && <Alert variant="info" onClose={() => setAlert(null)} dismissible>{alert}</Alert>}
            <Row>
                {data.map(item => (
                    <Col key={item._id} md={4} className="mb-4">
                        <Card onClick={() => handleCardClick(item)} style={{ cursor: 'pointer' }}>
                            <Card.Img variant="top" src={item.picUrl} alt={item.name} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    <strong>Category:</strong> {item.category}<br />
                                    <strong>Weight:</strong> {item.weight}<br />
                                    <strong>Age:</strong> {item.age}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}