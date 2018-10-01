const modelPath = require('path').resolve(__dirname, "..", "..", "models");
require("fs").readdirSync(modelPath).forEach(file => {
  name = file.split('.js')[0];
  (0, eval)('this')[name] = require(`../../models/${file}`);
});