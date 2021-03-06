const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('../config/config.js');
const CarBrand = require('./models/Brands');

mongoose.Promise = global.Promise;

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.post('/cars', (req,res) => {
  const title = req.body.title;
  CarBrand.create({
    title: title
  });
  res.send('ok')
});

app.get('/cars', (req,res) => {
  let carBrands = [];
  CarBrand.find().sort({ title: 'asc' }).exec(function (err, brands) {
    if (err) throw err;
    console.log(brands);
    carBrands = brands;
    res.send(carBrands);
  })

});

mongoose.connect(config.dbURL, config.dbOptions);

mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`);
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port ${config.port}...`));
  })
  .on('error', error => console.warn(error));
