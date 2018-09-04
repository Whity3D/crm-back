const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carBrandSchema = new Schema({
    title: String,
})

module.exports = mongoose.model('CarBrand', carBrandSchema);