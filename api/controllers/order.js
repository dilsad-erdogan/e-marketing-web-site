const Order = require('../models/order');
const User = require('../models/user');

async function getOrder(req, res) {
    try{
        const id = req.params.id;
        const orders = await Order.find({ user_id: id, is_active: true });

        if(orders){
            res.status(200).json({ success: true, data: orders });
        } else {
            res.status(404).json({ success: false, message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function addOrder(req, res) {
    try{
        const { user_id, total_price } = req.body;

        const id = await User.findById(user_id);
        if(!id || !id.is_active){
            return res.status(400).json({ success: false, message: 'User not found!' });
        }

        const order = new Order({
            user_id: user_id,
            total_price: total_price,
            date_time: Date.now(),
            is_active: true
        });

        const savedOrder = await order.save();
        if(savedOrder) {
            res.status(201).json({ success: true, data: savedOrder });
        } else {
            res.status(400).json({ success: false, message: 'Order error!' });
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error });
    }
};

async function deleteOrder(req, res) {
    try{
        const order_id = req.params.id;
        const order = await Order.findById(order_id);

        if(!order) {
            res.status(404).json({ success: false, message: 'Todo not found!' });
        } else {
            await order.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Order deleted successfully!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

async function getOrderId(req, res) {
    try{
        const id = req.params.id;
        const order = await Order.findById(id);

        if(order && order.is_active === true){
            res.status(200).json({ success: true, data: order });
        } else {
            res.status(404).json({ success: false, error: 'order not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
};

module.exports = {
    getOrder,
    addOrder,
    deleteOrder,
    getOrderId
};