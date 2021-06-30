// aplikos kintamieji
require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');

const mongoose = require('mongoose');

// jei bus heroku nustatytas portas mes imsime ji is aplinkos kintamuju
const PORT = process.env.PORT || 5000;

app.use(cors());
// middle ware - to get req.body in json
app.use(express.json());

const todoApi = require('./api/todoApi');

app.use('/', todoApi);

// prisijungimas prie duomenu bazes
mongoose
  .connect(process.env.MONGO_CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('Conneced to Mongo ooooooooose');
    app.listen(PORT, console.log(`backEnd ondline on port ${PORT}`));
  })
  .catch((err) => console.error(err.message));
