const express = require('express');
const indexRoutes = require('./routes/indexRoutes');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(cors());
app.use("/", indexRoutes)

module.exports = app;