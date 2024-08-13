const express = require("express");
const dotenv = require("dotenv");
const pool = require("./config/db.js");
const cafeRoutes = require("./routes/cafes.routes.js");
const bodyParser = require("body-parser");

// Inicialización
dotenv.config();
pool;

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(bodyParser.json());
app.use("/", cafeRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

module.exports = app;
