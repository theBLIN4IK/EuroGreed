const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    discountPrice: {
         type: Number,
         required: false

         },
         showDiscount: {
            type: Boolean,
            default: false,
            required: false 
       }
});

const productsModel = mongoose.model('products', productsSchema)

module.exports = productsModel
