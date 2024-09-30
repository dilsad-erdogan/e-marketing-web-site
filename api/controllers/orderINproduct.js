const OrderInProduct = require('../models/orderINproduct');
const Order = require('../models/order');
const Basket = require('../models/basket');

async function getOIP(req, res) {
    try{
        const id = req.params.id;
        const oip = await OrderInProduct.find({ order_id: id, is_active: true });
        
        if(oip) {
            res.status(200).json({ success: true, data: oip });
        } else {
            res.status(404).json({ success: false, message: 'OIP not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function addOIP(req, res) {
    try{
        const { order_id, basket_id } = req.body;

        const o_id = await Order.findById(order_id);
        if(!o_id || !o_id.is_active){
            const b_id = await Basket.findById(basket_id);
            if(!b_id || !b_id.is_active){
                return res.status(400).json({ success: false, message: 'OIP not found!' });
            }
        }

        const oip = new OrderInProduct({
            order_id: order_id,
            basket_id: basket_id,
            date_time: Date.now(),
            is_active: true
        });

        const savedOIP = await oip.save();
        if(savedOIP) {
            res.status(201).json({ success: true, data: savedOIP });
        } else {
            res.status(400).json({ success: false, message: 'OIP error!' });
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function deleteOIP(req, res) {
    try{
        const oip_id = req.params.id;
        const oip = await OrderInProduct.findById(oip_id);

        if(!oip) {
            res.status(404).json({ success: false, message: 'OIP not found!' });
        } else {
            await oip.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'OIP deleted successfully!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

module.exports = {
    getOIP,
    addOIP,
    deleteOIP
};