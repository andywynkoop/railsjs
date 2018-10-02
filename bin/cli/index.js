module.exports = ({
  new: require('./new.js'),
  s: require('./server', (err, stdout, stderr) => {
    console.log(stdout);
  }),
});