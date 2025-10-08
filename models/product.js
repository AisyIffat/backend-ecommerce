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
    // linkage between the products and categories
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    image: {
        type: String,
    },
});

// create a Modal from the schema
const Product = model("Product", productSchema);

module.exports = Product;