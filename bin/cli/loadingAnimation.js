module.exports = () => {
  let count = 1;
  return setInterval(() => {
    process.stdout.clearLine();  // clear current text
    process.stdout.cursorTo(0);
    process.stdout.write(new Array(count).join('.'));
    count++;
    if (count > 25) count = 0;
  }, 50);
}