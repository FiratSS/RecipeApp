# Recipe App

## Overview
Recipe App is a full-stack application that allows users to search for recipes via an external API and manage a local recipe database using MongoDB. This application is split into two main parts: the frontend developed in React and the backend powered by Node.js and Express.

## Project Phases

### Phase 1: Core Functionality
- **Recipe Searching**: Implement functionality for users to search for recipes based on ingredients, cuisine, or other criteria.
- **Recipe Submission**: Allow users to submit their recipes, including ingredients, instructions, and images.
- **User Authentication**: Enable user account creation for saving favorites, submitting recipes, and profile customization.

### Phase 2: Advanced Features
- **Favorites Management**: Allow users to save and manage their favorite recipes.
- **User Profiles**: Implement user profile pages where users can see their submitted and favorite recipes.
- **Comments and Ratings**: Enable users to comment on and rate recipes.

### Phase 3: Optimization and Scaling
- **Performance Optimization**: Improve application performance and load times.
- **Scalability**: Ensure the application can handle increased traffic and data.
- **Security Enhancements**: Implement advanced security features to protect user data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine using Docker.

### Prerequisites

- Docker
- Docker Compose

### Setting Up Firebase

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Set up Authentication (e.g., Email/Password, Google, Twitter).

2. **Add a Web App to Your Firebase Project**:
   - Register a web app and copy the Firebase configuration object.

3. **Create Firebase Configuration File**:
   - Create a file named `firebaseConfig.js` in your `frontend/src` directory and paste your Firebase configuration object:

     ```javascript
     // src/firebaseConfig.js
     import { initializeApp } from 'firebase/app';
     import { getAuth, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';

     const firebaseConfig = {
       apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
       authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
       projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
       storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
       messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
       appId: process.env.REACT_APP_FIREBASE_APP_ID
     };

     // Initialize Firebase
     const app = initializeApp(firebaseConfig);
     const auth = getAuth(app);

     const googleProvider = new GoogleAuthProvider();
     const twitterProvider = new TwitterAuthProvider();

     export { auth, app, googleProvider, twitterProvider };
     ```

### Setting Up mkcert

1. **Install mkcert**:
   - Follow the installation instructions for your operating system from the [mkcert GitHub repository](https://github.com/FiloSottile/mkcert).

2. **Generate and Install Certificates**:
   - Run the following commands to create and install local certificates:

     ```bash
     mkcert -install
     mkcert localhost 127.0.0.1 ::1
     ```

3. **Use Certificates in Your Backend**:
   - Update your backend server to use the generated certificates. Ensure you reference the correct paths to your certificates in your backend configuration.

### Running the Application with Docker

1. **Create a `.env` File**

   Create a `.env` file in your project root directory with the following content:

   ```env
   EDAMAM_APP_ID=your_edamam_app_id
   EDAMAM_APP_KEY=your_edamam_app_key
   MONGO_URI=mongodb://mongo:27017/your_db_name
   JWT_SECRET=your_jwt_secret
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
2. Create docker-compose.yml

Create a docker-compose.yml file in your project root directory:
```yaml
version: '3.8'

services:
  frontend:
    image: <your-dockerhub-username>/recipeapp-frontend:latest
    ports:
      - "3001:80"
    networks:
      - recipe-network

  backend:
    image: <your-dockerhub-username>/recipeapp-backend:latest
    environment:
      - MONGO_URI=${MONGO_URI}
      - JWT_SECRET=${JWT_SECRET}
    ports:
      - "3000:3000"
    networks:
      - recipe-network
    volumes:
      - ./backend/certs:/etc/ssl/certs

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    networks:
      - recipe-network

networks:
  recipe-network:
```
3. Run Docker Compose

In your project root directory, run the following command:
```bash
docker-compose up -d
```
This command will pull the images from Docker Hub and start the services.

Using the App
Frontend: Accessible at http://localhost:3001
Backend: API accessible at http://localhost:3000
MongoDB: Database accessible at mongodb://localhost:27017

Built With
React - The web framework used for the frontend.
Node.js - The runtime environment for the backend.
Express - The web framework used for the backend.
MongoDB - The database used for storing recipes.
Docker - For containerization.
Firebase - For authentication and other backend services.
mkcert - For local HTTPS certificates.

Contributing
We welcome contributions from the community. If you wish to contribute to the Recipe App, please first discuss the change you wish to make via an issue on this repository or any other method of contact listed in the CONTRIBUTING.md file. This helps prevent duplication of effort and ensures that your contributions can be incorporated effectively.

Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.

Authors
Firat - Initial work - Firatss
See also the list of contributors who participated in this project.

License
This project is licensed under the MIT License - see the LICENSE.md file for details

Acknowledgments
- Hat tip to anyone whose code was used
- Inspiration: My food curiosity and the belief in a community this app can create around. Special thanks to my friends for supporting my ideas and giving feedback during and before starting the project.

  
