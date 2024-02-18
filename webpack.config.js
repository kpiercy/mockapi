const path = require('path')

module.exports = {
    entry: './server.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'api.bundle.js',
    },
    target: 'node',
}
