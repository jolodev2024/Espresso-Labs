import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const AgentDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [agent, setAgent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const response = await fetch(`http://localhost:5000/agents/${id}`);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setAgent(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAgent();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!agent) return <div>No Agent Found</div>;

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Agency Detail Information
            </Typography>
            <Typography variant="h5">Name: {agent?.name}</Typography>
            <Typography variant="body1">Email: {agent?.email}</Typography>
            <Typography variant="body1">Status: {agent?.status}</Typography>
            <Typography variant="body1">Detail: {agent?.detail}</Typography>
            <Button onClick={() => navigate(-1)}>Back</Button>
        </Box>
    );
};

export default AgentDetails;
