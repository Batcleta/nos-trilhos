const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const syncRead = (app) => {
  const fileReader = fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach((file) => {
      const routeName = `/${file.split(".")[0].toLocaleLowerCase()}`;
      const posts = require(path.join(__dirname, file));
      app.use(routeName, posts);
    });

  return fileReader;
};

module.exports = syncRead;
