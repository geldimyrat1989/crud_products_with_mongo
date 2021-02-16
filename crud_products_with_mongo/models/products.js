//require mongoose for creating model schema:
const mongoose = require('mongoose');
//creating products schema:
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    img: {
        type: String,
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['suit', 'coat', 'shoes']
    }
})

//this way mongo will create us "products" collection:
const Product = mongoose.model('Product', productSchema);

//here we exporting our schema:
module.exports = Product;
