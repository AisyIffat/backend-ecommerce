const { Schema, model } = require("mongoose");

// declare the schema for Products
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

// create a Modal from the schema
const Product = model("Product", productSchema);

module.exports = Product;