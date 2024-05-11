// __mocks__/axios.js
const mockAxios = jest.createMockFromModule('axios');

// Mock any axios instance methods like 'get', 'post', etc.
mockAxios.create = jest.fn(() => mockAxios);

// Default mock implementation for get, post, or other methods
mockAxios.get = jest.fn(() => Promise.resolve({ data: {} }));
mockAxios.post = jest.fn(() => Promise.resolve({ data: {} }));
// Add other axios methods as needed, like delete, put, etc.

export default mockAxios;
