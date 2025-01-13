import React, { useState, useEffect } from 'react';
import { useAgentContext } from '../context/AgentContext.tsx';
import { Agent } from '../types/Agent.tsx';
import {
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  TextareaAutosize
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const AgentForm: React.FC<{ onClose: () => void; open: boolean; agentToEdit?: Agent }> = ({ onClose, open, agentToEdit }) => {
    const { dispatch } = useAgentContext();
    const [name, setName] = useState<string>(agentToEdit?.name || '');
    const [email, setEmail] = useState<string>(agentToEdit?.email || '');
    const [status, setStatus] = useState<'Active' | 'Inactive'>(agentToEdit?.status || 'Active');
    const [detail, setDetail] = useState<string>(agentToEdit?.detail || '');

    useEffect(() => {
        if (agentToEdit) {
            setName(agentToEdit.name);
            setEmail(agentToEdit.email);
            setStatus(agentToEdit.status);
            setDetail(agentToEdit.detail);
        }
    }, [agentToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedAgent: Agent = {
            id: agentToEdit ? agentToEdit.id : String(Date.now()),
            name,
            email,
            status,
            detail,
        };

        if (agentToEdit) {
            // Update existing agent
            await fetch(`http://localhost:5000/agents/${agentToEdit.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAgent),
            });
        } else {
            // Add new agent
            await fetch('http://localhost:5000/agents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAgent),
            });
        }

        // Refresh the agent list  
        const response = await fetch('http://localhost:5000/agents');
        const data = await response.json();
        dispatch({ type: 'SET_AGENTS', payload: data });
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                    <TextField type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Please input name" variant='outlined' label="Name" sx={{ width: "100%" }} required />
                    <TextField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Please input email" variant='outlined' label="Email" style={{ marginTop: "20px" }} sx={{ width: "100%" }} required />
                    <Box sx={{ minWidth: 120, marginTop: "20px" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Status"
                                onChange={e => setStatus(e.target.value as 'Active' | 'Inactive')}
                            >
                                <MenuItem value={"Active"}>Active</MenuItem>
                                <MenuItem value={"Inactive"}>Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <TextareaAutosize
                        minRows={3}
                        placeholder="Please input detail info"
                        style={{
                            width: '100%',
                            fontSize: '1rem',
                            padding: '8px',
                            marginTop: '20px',
                            borderRadius: '4px',
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                        }}
                        value={detail}
                        onChange={e => setDetail(e.target.value)}
                    />
                    <Button style={{ marginTop: "10px" }} variant="contained" type="submit">
                      {agentToEdit ? 'Update Agent' : 'Add Agent'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AgentForm;
