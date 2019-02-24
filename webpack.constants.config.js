const path = require('path');

const SRC = path.resolve(__dirname, 'src');

module.exports = {
  paths: {
    SRC,
    PUBLIC: path.resolve(__dirname, 'public'),
    STATIC: path.join(SRC, 'static'),
    BUILD: path.resolve(__dirname, 'build'),
  },
};
