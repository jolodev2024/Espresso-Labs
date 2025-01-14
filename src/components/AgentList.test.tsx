import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AgentList from './AgentList';
import { AgentProvider } from '../context/AgentContext';

const mockAgents = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'Active', detail: 'Test detail' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', detail: 'Another detail' },
];

jest.mock('../context/AgentContext', () => ({
  ...jest.requireActual('../context/AgentContext'),
  useAgentContext: () => ({
    state: { agents: mockAgents },
    dispatch: jest.fn(),
  }),
}));

describe('AgentList', () => {
  it('renders the list of agents', () => {
    render(
      <MemoryRouter>
        <AgentProvider>
          <AgentList searchTerm="" />
        </AgentProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('filters agents based on search term', () => {
    render(
      <MemoryRouter>
        <AgentProvider>
          <AgentList searchTerm="john" />
        </AgentProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('opens edit form when Edit button is clicked', async () => {
    render(
      <MemoryRouter>
        <AgentProvider>
          <AgentList searchTerm="" />
        </AgentProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByText('Edit')[0]);

    await waitFor(() => {
      expect(screen.getByText('Update Agent')).toBeInTheDocument();
    });
  });

});

