import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the matchers
import App from './App';

test('renders search and submit components properly', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Search for recipes...')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: "I'm hangry" })).toBeInTheDocument();
});
