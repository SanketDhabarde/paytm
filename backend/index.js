const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { initializeDb } = require("./db/db.connection");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

initializeDb();

app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
