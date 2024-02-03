import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Main } from '../components/main';
import { MemoryRouter } from 'react-router-dom'; 

describe('Main Component', () => {
  it('renders with the correct classes', () => {
    const { getByTestId } = render(
        <MemoryRouter>
          <Main todos={[]} dispatch={() => {}} />
        </MemoryRouter>
      );
    expect(getByTestId('main')).toHaveClass('main');
  });

  it('renders list of todos according to route', () => {
    // Mock useLocation to return a specific route for testing
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({ pathname: '/active' }),
    }));

    const { getByTestId } = render(
        <MemoryRouter initialEntries={['/active']}>
          <Main todos={[{ id: 1, title: 'Test Todo', completed: false }]} dispatch={() => {}} />
        </MemoryRouter>
      );
    expect(getByTestId('todo-list')).toBeInTheDocument();
  });

});
