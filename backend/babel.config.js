// babel.config.js for backend
module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }] // Only necessary if using features not supported by your Node.js version
    ]
};
