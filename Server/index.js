const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./src/models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
require("./src/routes/index")(app);

// Server
const port = 3001;
db.sequelize
  .sync({
    // force: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port: ${port}`);
    });
  });
