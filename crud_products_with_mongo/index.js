//first require express:
const express = require('express');
//then save it to variable and execute:
const app = express();
//require path to join absolute path:
const path = require('path');
//require mongoose:
const mongoose = require('mongoose');
//for CRUD we need method-override also:
const methodOverride = require('method-override');

//here we importing productschema from models/products.js:
const Product = require('./models/products');


//connecting mongoose to mongoDB:
mongoose.connect('mongodb://localhost:27017/product', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() =>
    {
        console.log('Mongo connection open!!!');
    })
    .catch(err =>
    {
        console.log('Oh OH, MONGO ERROR!!!');
        console.log(err);
    });

//setting the path with path.join:    
app.set('views', path.join(__dirname, 'views'));
//setting view engine to ejs:
app.set('view engine', 'ejs');


//using a middleware to parse data:
app.use(express.urlencoded({ extended: true }));
//using another middleware for method-override for using Patch and Delete request from HTML form:
app.use(methodOverride('_method'));

//passing categories dynamically:
const categories = ['suit', 'coat', 'shoes'];

app.get('/products', async (req, res) =>
{
    const { category } = req.query;
    if (category)
    {
        const product = await Product.find({ category })
        res.render('products/index', { product, category })
    } else
    {
        const product = await Product.find({});
        res.render('products/index', { product });

    }
});
// app.get('/products', async (req, res) =>
// {
//     const product = await Product.find({});
//     res.render('products/index', { product })
// })

//first getting the form for posting new product:
app.get('/products/new', (req, res) =>
{
    //rendering the new page form:
    res.render('products/new', { categories })
})

//then sending post request for new product:
app.post('/products', async (req, res) =>
{
    //getting the new product from req.body:
    const newProduct = new Product(req.body);
    //and saving it to the MongoDB:
    await newProduct.save();
    //then redirecting to the show page with particular product:
    res.redirect(`/products/${ newProduct._id }`);
})

app.get('/products/:id', async (req, res) =>
{
    // as usual finding by id:
    const { id } = req.params;
    const product = await Product.findById(id);
    //rendering the show page:
    res.render('products/show', { product });
})


app.get('/products/:id/edit', async (req, res) =>
{
    //finding the product by id:
    const { id } = req.params;
    //we should await while mongo is finding product:
    const product = await Product.findById(id);
    //rendering the edit form:
    res.render('products/edit', { product, categories });
})

//put request with method-override:
app.put('/products/:id', async (req, res) =>
{
    //finding by id:
    const { id } = req.params;
    //and updating particular product:
    const product = await Product.findByIdAndUpdate(id,
        req.body, { runValidators: true, new: true });
    //then redirecting to show page of particular product:
    res.redirect(`/products/${ product._id }`);
})

//delete request with express through method-override:
app.delete('/products/:id', async (req, res) =>
{
    //finding by id:
    const { id } = req.params;
    //finding by id and deleting product from MongoDB:
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})



app.listen(3000, () =>
{
    console.log('Listening on port 3000!!!');
})    