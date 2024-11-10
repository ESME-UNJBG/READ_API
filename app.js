require("dotenv").config();
const express = require("express");
const cors = require("cors");
const loggerStream = require("./utils/handleLogger");
const dbConnect = require("./config/mongo");
const app = express();
const { model } = require("mongoose");
const morganBody = require("morgan-body");
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});

const port = process.env.PORT || 3000;
/**aqui  invocamos alas rutas*/
app.use("/api", require("./routers"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

dbConnect();
