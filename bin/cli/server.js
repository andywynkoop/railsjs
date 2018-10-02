const exec = require('child_process').exec;
module.exports = () => {
  console.log("Starting server...")
  exec('npm start', (err, stdout, stderr) => {
    console.log(err, stdout, stderr);
  });
}