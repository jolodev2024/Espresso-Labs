import React, { useState, useCallback } from 'react';
import { Container } from '@mui/material';
import { AgentProvider } from './context/AgentContext.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AgentForm from './components/AgentForm.tsx';
import AgentDetails from './components/AgentDetails.tsx';
import AgentDashboard from './components/AgentDashboard.tsx'; // Import the new component

const App: React.FC = () => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term);
    }, []);

    const toggleFormVisibility = useCallback(() => {
        setFormVisible((prev) => !prev);
    }, []);

    return (
        <AgentProvider>
            <Router>
                <Container maxWidth="xl" sx={{ mt: 2 }}>
                    <Routes>
                        {/* Use the new AgentDashboard component */}
                        <Route
                            path="/"
                            element={
                                <AgentDashboard
                                    searchTerm={searchTerm}
                                    onSearch={handleSearch}
                                    toggleFormVisibility={toggleFormVisibility}
                                />
                            }
                        />
                        <Route path="/agent/:id" element={<AgentDetails />} />
                    </Routes>

                    {isFormVisible && (
                        <AgentForm onClose={toggleFormVisibility} open={isFormVisible} />
                    )}
                </Container>
            </Router>
        </AgentProvider>
    );
};

export default App;
