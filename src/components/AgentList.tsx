import React, { useState, useCallback } from 'react';
import { useAgentContext } from '../context/AgentContext.tsx';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AgentForm from './AgentForm.tsx'; 
import { Agent } from '../types/Agent';

interface AgentListProps {
    searchTerm: string;
}

const AgentList: React.FC<AgentListProps> = ({ searchTerm }) => {
    const { state, dispatch } = useAgentContext();
    const navigate = useNavigate();
    const [isEditVisible, setEditVisible] = useState(false);
    const [agentToEdit, setAgentToEdit] = useState<Agent | null>(null);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await fetch(`http://localhost:5000/agents/${id}`, { method: 'DELETE' });
            dispatch({ type: 'REMOVE_AGENT', payload: id });
        } catch (error) {
            console.error('Error deleting agent', error);
        }
    }, [dispatch]);

    const filteredAgents = state.agents.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditClick = useCallback((agent: Agent, e: React.MouseEvent) => {
        e.stopPropagation();
        setAgentToEdit(agent);
        setEditVisible(true);
    }, []);

    return (
        <div>
            <Typography variant="h6">Agent List</Typography>
            <TableContainer component={Paper} sx={{ minWidth: "500px", overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAgents.map(agent => (
                            <TableRow key={agent.id} hover onClick={() => navigate(`/agent/${agent.id}`)}>
                                <TableCell>{agent.name}</TableCell>
                                <TableCell>{agent.email}</TableCell>
                                <TableCell>{agent.status}</TableCell>
                                <TableCell align="center">
                                    <Button sx={{ mr: 1 }} variant="outlined" color="secondary" onClick={(e) => handleEditClick(agent, e)}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={(e) => { e.stopPropagation(); handleDelete(agent.id); }}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {isEditVisible && agentToEdit && (
                <AgentForm
                    onClose={() => setEditVisible(false)}
                    open={isEditVisible}
                    agentToEdit={agentToEdit}
                />
            )}
        </div>
    );
};

export default AgentList;
