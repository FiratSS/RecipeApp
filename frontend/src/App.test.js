import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

test('displays loading indicator while fetching data', async () => {
  axios.get.mockImplementation(() =>
    new Promise(resolve => setTimeout(() => resolve({ data: { hits: [{ recipe: { title: 'Pizza' } }] } }), 100))
  );

  render(<App />);
  // Immediately check for the presence of the loading indicator
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for the data to be displayed
  await waitFor(() => expect(screen.getByText('Pizza')).toBeInTheDocument());
});

test('displays error message when API call fails', async () => {
  axios.get.mockRejectedValue(new Error('API Error'));

  render(<App />);
  // Ensure the error message is displayed
  await waitFor(() => expect(screen.getByText(/Error: Failed to fetch recipes/)).toBeInTheDocument());
});

test('renders search and submit components properly', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Search for recipes...')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: "I'm hangry" })).toBeInTheDocument();
});
