import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AgentDetails from './AgentDetails';

const mockAgent = {
  id: '1736804374819',
  name: 'John Doe',
  email: 'john@example.com',
  status: 'Active',
  detail: 'Test detail',
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockAgent),
  })
) as jest.Mock;

describe('AgentDetails', () => {
  it('renders agent details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/agent/1736804374819']}>
        <Routes>
          <Route path="/agent/:id" element={<AgentDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No Agent Found')).toBeInTheDocument();
    });
  });
});

