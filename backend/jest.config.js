module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    setupFilesAfterEnv: ['./setupTests.js'], // only if you have global setups
};
