import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders correctly', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  it('calls onSearch when input changes', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'test' } });
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});

