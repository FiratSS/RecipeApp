module.exports = {
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],  // Ensure your setup file is correctly referenced

    transformIgnorePatterns: [
        '/node_modules/',  // Ignore all modules that shouldn't be transformed
        '\\.pnp\\.[^\\/]+$'  // Ignore PnP files which are not transformable
    ]
};
