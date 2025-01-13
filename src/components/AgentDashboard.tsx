import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import SearchBar from './SearchBar.tsx';
import AgentList from './AgentList.tsx';

interface AgentDashboardProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  toggleFormVisibility: () => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ searchTerm, onSearch, toggleFormVisibility }) => (
  <>
    <Typography variant="h4" component="h1" gutterBottom>
      Agent Management
    </Typography>
    <SearchBar onSearch={onSearch} />
    <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
      <Button variant="contained" color="primary" onClick={toggleFormVisibility}>
        Add Agent
      </Button>
    </Box>
    <AgentList searchTerm={searchTerm} />
  </>
);

export default AgentDashboard;
