import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

test('check of login and signup buttons', () => {
  render(<Navbar />);
  const login = screen.getByText(/Login/i);
  const signup = screen.getByText(/Register/i);
  
  expect(login).toBeInTheDocument();
  expect(signup).toBeInTheDocument();
});
