const express = require("express");
// create a express router
const router = express.Router();

/*
    Routes for products
    GET /products - list all the products
    GET /products/68941f1bcef7f0dcfa6a9a4b - get a specific product
    POST /products - add new product
    PUT /products/68941f1bcef7f0dcfa6a9a4b - update product
    DELETE /products/68941f1bcef7f0dcfa6a9a4b - delete product
*/
const {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product");

// GET /products - list all the products
router.get("/", async (req, res) => {
    const category = req.query.category;
    const page = req.query.page;
    const products = await getProducts(category, page);    
    res.status(200).send(products);
});

// GET /products/:id - get a specific product
router.get("/:id", async (req, res) => {
    // retrieve id from params
    const id = req.params.id;
    const product = await getProduct(id);
    res.send(product);
});

/*
    POST /products - add new product
    This POST route need to accept the following parameters:
    - name
    - description
    - price
    - category
*/
router.post("/", async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;

        // check error - make sure all the fields are not empty
        if ( !name || !price || !category ) {
            res.status(400).send({
                message: "All the fields are required",
            });
        }
        res
            .status(200)
            // short hand
            .send(await addProduct(name, description, price, category));
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

// PUT /products/68941f1bcef7f0dcfa6a9a4b - update product
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id; // id of the product
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;

        // check error - make sure all the fields are not empty
        if ( !name || !price || !category ) {
            res.status(400).send({
                message: "All the fields are required",
            });
        }

        res
            .status(200)
            .send(
                await updateProduct(id, name, description, price, category)
            );
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

// DELETE /products/68941f1bcef7f0dcfa6a9a4b - delete product
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await deleteProduct(id);

        res.status(200).send({
            message: `Product with the ID of ${id} has been deleted`,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Unknown error" });
    }
});

module.exports = router;