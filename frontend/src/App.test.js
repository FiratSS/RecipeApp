import React from 'react';
import { render, screen,/* waitFor*/ } from '@testing-library/react';
// import axios from 'axios';
import App from './App';

jest.mock('axios');

// test('shows a loading indicator while fetching data', async () => {
//   axios.get.mockImplementation(() =>
//     new Promise(resolve => setTimeout(() => resolve({
//       data: { hits: [{ recipe: { title: 'Test Recipe' } }] }
//     }), 100))  // Reduced timeout for quicker test execution
//   );

//   render(<App />);
//   expect(screen.getByText("Loading...")).toBeInTheDocument();  // Correct text match

//   await waitFor(() => expect(screen.getByText('Test Recipe')).toBeInTheDocument());
// });

// test('displays error message when API call fails', async () => {
//   axios.get.mockRejectedValue(new Error('API Error'));

//   render(<App />);
//   // Wait for the error message to be displayed
//   await waitFor(() => expect(screen.getByText(/Error: Failed to fetch recipes/)).toBeInTheDocument());
// });

test('renders search and submit components properly', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Search for recipes...')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: "I'm hangry" })).toBeInTheDocument();
});
