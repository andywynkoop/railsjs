const controllersPath = require('path').resolve(__dirname, "..", "..", "controllers");
require("fs").readdirSync(controllersPath).forEach(file => {
  name = file.split('').map((el, idx) => (idx === 0) ? el.toUpperCase() : el).join('').split('.js')[0];
  (0, eval)('this')[name] = require(`../../controllers/${file}`);
});