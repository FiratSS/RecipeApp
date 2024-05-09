# Recipe App

## Overview
Recipe App is a full-stack application that allows users to search for recipes via an external API and manage a local recipe database using MongoDB. This application is split into two main parts: the frontend developed in React and the backend powered by Node.js and Express.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installing

A step by step series of examples that tell you how to get a development environment running.

#### Setting up the Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install necessary packages:
    ```bash
    npm install
    ```
3. Start the MongoDB service (ensure MongoDB is installed and properly configured):
    ```bash
    mongod
    ```
4. Run the server:
    ```bash
    node server.js
    ```

#### Setting up the Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the React application:
    ```bash
    npm start
    ```

This will serve the frontend on `http://localhost:3000`.

## Using the App

- **Search Recipes**: Enter ingredients or dish names to fetch recipes from the external API.
- **Manage Recipes**: Add, delete, and update recipes in the local MongoDB database via the backend API.

## Built With

- [React](https://reactjs.org/) - The web framework used for the frontend.
- [Node.js](https://nodejs.org/) - The runtime environment for backend.
- [Express](https://expressjs.com/) - The web framework used for backend.
- [MongoDB](https://www.mongodb.com/) - The database used for storing recipes.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/yourusername/recipeapp/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/yourusername/recipeapp/tags).

## Authors

- **Your Name** - *Initial work* - [YourUsername](https://github.com/YourUsername)

See also the list of [contributors](https://github.com/yourusername/recipeapp/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
