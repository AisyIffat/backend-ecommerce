// import the Product model
const Product = require("../models/product");

async function getProducts(category, page = 1, itemsPerPage = 6) {
  // create a container for filter
  let filter = {};
  // if category exists, then only add it into the filter container
  if (category) {
    filter.category = category;
  }

  const products = await Product.find(filter)
    .populate("category")
    .limit(itemsPerPage)
    .skip((page - 1) * itemsPerPage)
    .sort({ _id: -1 });
  return products;
}

async function getProduct(id) {
  // load the product data
  const product = await Product.findById(id);
  return product;
}

async function addProduct(name, description, price, category, image) {
  // create new product
  const newProduct = new Product({
    name: name,
    description: description,
    price: price,
    category: category,
    image,
  });
  // save the new product into mongodb
  await newProduct.save(); // clicking the "save" button
  return newProduct;
}

async function updateProduct(id, name, description, price, category, image) {
  return await Product.findByIdAndUpdate(
    id,
    {
      name: name,
      description: description,
      price: price,
      category: category,
      image,
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
