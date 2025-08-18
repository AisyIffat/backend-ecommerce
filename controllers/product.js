// import the Product model
const Product = require("../models/product");

async function getProducts(price, category) {
    // create a container for filter
    let filter = {};
    // if price exists, then only add it into the filter container
    if (price) {
        filter.price = { $gt: price };
    }
    // if category exists, then only add it into the filter container
    if (category) {
        filter.category = category;
    }

    // load the products data from MongoDB
    const products = await Product.find(filter).sort({ _id: -1 });
    // return the products
    return products;
}

async function getProduct(id) {
    // load the product data
    const product = await Product.findById(id);
    return product;
}

async function addProduct(name, description, price, category) {
    // create new product
    const newProduct = new Product({
        name: name,
        description: description,
        price: price,
        category: category,
    });
    // save the new product into mongodb
    await newProduct.save(); // clicking the "save" button
    return newProduct;
}

async function updateProduct(id, name, description, price, category) {
    return await Product.findByIdAndUpdate(
        id, 
        {
            name: name,
            description: description,
            price: price,
            category: category,
        }, 
        {
            new: true, // return the updated data
        }
    );
}

async function deleteProduct(id) {
    // delete the product
    return await Product.findByIdAndDelete(id);
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
};