const path = require('path');
const exec = require('child_process').exec;
const { ncp } = require('ncp');

module.exports = (...args) => {
  const appName = args[0];
  let source = path.resolve(__dirname, "..", "..");
  exec(`mkdir ${appName}`, (err) => {
    if (err) return console.log(`Directory ${appName} already exists at this location.`);
    exec('pwd', (_err, stdout) => {
      const target = stdout.split("\n")[0] + `/${appName}`;
      console.log(`Creating app ${appName}`)

      ncp(source, target);
      console.log("Installing dependencies...");
      exec(`cd ${appName} && npm install`, () => {
        console.log(`${appName} created successfully!`)
      })
    });
  });
  
  // ncp(source, target);
}; 