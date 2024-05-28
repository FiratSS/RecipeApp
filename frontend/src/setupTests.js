// src/setupTests.js

// Polyfill for TextDecoder and TextEncoder
const { TextDecoder, TextEncoder } = require('text-encoding');

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

// Mock axios
jest.mock('axios');
