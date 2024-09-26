const { EventEmitterAsyncResource } = require('nodemailer/lib/xoauth2');
const Basket = require('../models/basket');
const User = require('../models/user');

async function getBasket(req, res) {
    try{
        const id = req.params.id;
        const baskets = await Basket.find({ user_id: id, is_active: true });

        if(baskets) {
            res.status(200).json({ success: true, data: baskets });
        } else {
            res.status(404).json({ success: false, message: 'Basket not found' });
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function addBasket(req, res) {
    try{
        const { user_id, product_id, amount } = req.body;

        const id = await User.findById(user_id);
        if(!id || !id.is_active){
            return res.status(400).json({ success: false, message: 'User not found!' });
        }

        const basket = new Basket({
            user_id: user_id,
            product_id: product_id,
            amount: amount,
            date_time: Date.now(),
            is_active: true
        });

        const savedBasket = await basket.save();
        if(savedBasket) {
            res.status(201).json({ success: true, data: savedBasket });
        } else {
            res.status(400).json({ success: false, message: 'Basket error!' });
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function updateAmount(req, res) {
    try{
        const basket_id = req.params.id;
        const { amount } = req.body;

        const basket = await Basket.findById(basket_id);
        if(!basket){
            return res.status(404).json({ success: false, message: 'Basket not found!' });
        }

        basket.amount = amount;
        basket.save();

        res.status(200).json({ success: true, message: 'Basket updated amount successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function deleteBasket(req, res) {
    try{
        const basket_id = req.params.id;
        const basket = await Basket.findById(basket_id);

        if(!basket) {
            res.status(404).json({ success: false, message: 'basket not found!' });
        } else {
            await basket.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'basket deleted successfully!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

module.exports = {
    getBasket,
    addBasket,
    updateAmount,
    deleteBasket
};