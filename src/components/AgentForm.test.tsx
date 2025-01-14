import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AgentForm from './AgentForm';
import { AgentProvider } from '../context/AgentContext';

const mockOnClose = jest.fn();

describe('AgentForm', () => {
  it('renders correctly for adding a new agent', () => {
    render(
      <AgentProvider>
        <AgentForm onClose={mockOnClose} open={true} />
      </AgentProvider>
    );

    expect(screen.getByText('Add Agent')).toBeInTheDocument();
  });

  it('renders correctly for editing an existing agent', () => {
    const mockAgent = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'Active' as const,
      detail: 'Test detail',
    };

    render(
      <AgentProvider>
        <AgentForm onClose={mockOnClose} open={true} agentToEdit={mockAgent} />
      </AgentProvider>
    );

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Active')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test detail')).toBeInTheDocument();
    expect(screen.getByText('Update Agent')).toBeInTheDocument();
  });

  it('submits the form with correct data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock;

    render(
      <AgentProvider>
        <AgentForm onClose={mockOnClose} open={true} />
      </AgentProvider>
    );

    fireEvent.click(screen.getByText('Add Agent'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/agents', expect.any(Object));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});

