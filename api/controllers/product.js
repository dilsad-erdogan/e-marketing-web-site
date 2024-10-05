const Product = require('../models/product');

async function getProduct(req, res) {
    try {
        const products = await Product.find();

        if (products) {
            res.status(200).json({ success: true, data: products });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function addProduct(req, res) {
    try{
        const { name, photo, price } = req.body;

        const product = new Product({
            name: name,
            photo: photo,
            price: price,
            date_time: Date.now(),
            is_active: true
        });

        const savedProduct = await product.save();
        if(savedProduct) {
            res.status(201).json({ success: true, data: savedProduct });
        } else {
            res.status(400).json({ success: false, message: 'Product error!' });
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updateName(req, res) {
    try{
        const product_id = req.params.id;
        const { name } = req.body;

        const product = await Product.findById(product_id);
        if(!product) {
            return res.status(404).json({ success: false, message: 'Product not found!' });
        }

        product.name = name;
        product.save();

        res.status(200).json({ success: true, message: 'Product updated name successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updatePhoto(req, res) {
        try{
        const product_id = req.params.id;
        const { photo } = req.body;

        const product = await Product.findById(product_id);
        if(!product) {
            return res.status(404).json({ success: false, message: 'Product not found!' });
        }

        product.photo = photo;
        product.save();

        res.status(200).json({ success: true, message: 'Product updated photo successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updatePrice(req, res) {
        try{
        const product_id = req.params.id;
        const { price } = req.body;

        const product = await Product.findById(product_id);
        if(!product) {
            return res.status(404).json({ success: false, message: 'Product not found!' });
        }

        product.price = price;
        product.save();

        res.status(200).json({ success: true, message: 'Product updated price successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function deleteProduct(req, res) {
    try{
        const product_id = req.params.id;
        const product = await Product.findById(product_id);

        if(!product) {
            res.status(404).json({ success: false, message: 'Product not found!' });
        } else {
            await product.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Product deleted successfully!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function getProductId(req, res) {
    try{
        const product_id = req.params.id;
        const product = await Product.findById(product_id);

        if(product && product.is_active === true){
            res.status(200).json({ success: true, data: product });
        } else {
            res.status(404).json({ success: false, error: 'Product not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

module.exports = {
    getProduct,
    addProduct,
    updateName,
    updatePhoto,
    updatePrice,
    deleteProduct,
    getProductId
};