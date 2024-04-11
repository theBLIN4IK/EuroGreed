const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    image: {
        type: String,
        required: true
    }
});

const productsModel = mongoose.model('products', productsSchema)

module.exports = productsModel
