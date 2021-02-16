//requiring mongoose:
const mongoose = require('mongoose');
//requiring Products module from models/products:
const Product = require('./models/products');

//connecting to mongo DB for saving data:
mongoose.connect('mongodb://localhost:27017/product', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() =>
    {
        console.log('Mongo connection open!!!');
    })
    .catch(err =>
    {
        console.log('Oh OH, ERROR!!!');
        console.log(err);
    })


const seedProducts = [
    {
        name: 'Black with white stripes',
        price: 200,
        img: 'https://img-lcwaikiki.mncdn.com/mnresize/800/-/pim/productimages/20202/4077006/v1/l_20202-0w2166z8-crp_a.jpg',
        category: 'suit'
    },
    {
        name: 'Red',
        price: 230,
        img: 'https://img-lcwaikiki.mncdn.com/mnresize/800/-/pim/productimages/20202/4262206/l_20202-0w7030z8-egj_a1.jpg',
        category: 'suit'
    },
    {
        name: 'Black',
        price: 400,
        img: 'https://img-lcwaikiki.mncdn.com/mnresize/800/-/pim/productimages/20202/4033301/l_20202-0w0777z8-cvl_a.jpg',
        category: 'coat'
    },
    {
        name: 'Leather',
        price: 150,
        img: 'https://img-lcwaikiki.mncdn.com/mnresize/800/-/pim/productimages/20202/4596180/l_20202-0wbj92z8-huc_a.jpg',
        category: 'shoes'
    }
]
module.exports = Product;

//inserting seedProducts to mongoDB:
Product.insertMany(seedProducts)
    .then(res =>
    {
        console.log(res)
    })
    .catch(e =>
    {
        console.log(e)
    })
    //to check in mongo db we have check first:show dbs,
    // use test, show collections, db.products.find()