const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./connection/dbconnection");
const routes = require("./routes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
