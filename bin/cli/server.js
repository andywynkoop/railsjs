const { fork } = require('child_process');
module.exports = (...params) => {
  console.log("Starting server...");
  fork('bin/server.js');
}