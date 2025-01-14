import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AgentDashboard from './AgentDashboard';

jest.mock('./SearchBar', () => ({ onSearch }: { onSearch: (term: string) => void }) => (
  <input data-testid="mock-search-bar" onChange={(e) => onSearch(e.target.value)} />
));
jest.mock('./AgentList', () => ({ searchTerm }: { searchTerm: string }) => (
  <div data-testid="mock-agent-list">{searchTerm}</div>
));

describe('AgentDashboard', () => {
  it('renders correctly', () => {
    const mockOnSearch = jest.fn();
    const mockToggleFormVisibility = jest.fn();
    render(
      <AgentDashboard
        searchTerm=""
        onSearch={mockOnSearch}
        toggleFormVisibility={mockToggleFormVisibility}
      />
    );

    expect(screen.getByText('Agent Management')).toBeInTheDocument();
    expect(screen.getByTestId('mock-search-bar')).toBeInTheDocument();
    expect(screen.getByText('Add Agent')).toBeInTheDocument();
    expect(screen.getByTestId('mock-agent-list')).toBeInTheDocument();
  });

  it('calls onSearch when search term changes', () => {
    const mockOnSearch = jest.fn();
    const mockToggleFormVisibility = jest.fn();
    render(
      <AgentDashboard
        searchTerm=""
        onSearch={mockOnSearch}
        toggleFormVisibility={mockToggleFormVisibility}
      />
    );

    fireEvent.change(screen.getByTestId('mock-search-bar'), { target: { value: 'test' } });
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('calls toggleFormVisibility when Add Agent button is clicked', () => {
    const mockOnSearch = jest.fn();
    const mockToggleFormVisibility = jest.fn();
    render(
      <AgentDashboard
        searchTerm=""
        onSearch={mockOnSearch}
        toggleFormVisibility={mockToggleFormVisibility}
      />
    );

    fireEvent.click(screen.getByText('Add Agent'));
    expect(mockToggleFormVisibility).toHaveBeenCalled();
  });
});

