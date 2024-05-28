// src/api/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/', // This should match your backend server URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Function to get the auth token from Firebase
const getAuthToken = async () => {
    return firebase.auth().currentUser ? await firebase.auth().currentUser.getIdToken() : null;
};

// Using interceptors to append the auth token to each request
api.interceptors.request.use(async config => {
    const token = await getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
export default api;