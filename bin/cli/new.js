const path = require('path');
const { exec } = require('child_process');
const { ncp } = require('ncp');
const loadingAnimation = require('./loadingAnimation');

module.exports = (...args) => {
  const appName = args[0];
  let source = path.resolve(__dirname, "..", "..");
  exec(`mkdir ${appName}`, (err) => {
    if (err) return console.log(`Directory ${appName} already exists at this location.`);
    exec('pwd', (_err, stdout) => {
      const target = stdout.split("\n")[0] + `/${appName}`;
      console.log(`Creating app ${appName}`);
      ncp(source, target);
      console.log("Installing dependencies");
      console.log("This may take a while...");
      const loading = loadingAnimation();
      exec(`cd ${appName} && npm install && npm run build`, () => {
        clearInterval(loading);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.log(`${appName} created successfully!`);
      });
    });
  });
}; 