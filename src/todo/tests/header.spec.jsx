import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Header } from '../components/header';

describe('Header Component', () => {
  it('renders with the correct title', () => {
    const { getByText } = render(<Header dispatch={() => {}} />);
    expect(getByText('todos')).toBeInTheDocument();
  });

  it('renders Input component', () => {
    const { getByTestId } = render(<Header dispatch={() => {}} />);
    expect(getByTestId('text-input')).toBeInTheDocument();
  });

  it('calls addItem function on form submission', () => {
    const mockDispatch = jest.fn();
    const { getByTestId } = render(<Header dispatch={mockDispatch} />);
    fireEvent.change(getByTestId('text-input'), { target: { value: 'Test Todo' } });
    fireEvent.keyDown(getByTestId('text-input'), { key: 'Enter', code: 13 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'ADD_ITEM', payload: { title: 'Test Todo' } });
  });
});
