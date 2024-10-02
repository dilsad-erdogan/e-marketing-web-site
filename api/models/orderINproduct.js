const mongoose = require('mongoose');

const orderINproductSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    date_time: {
        type: Date,
        default: Date.now
    },
    is_active: {
        type: Boolean
    }
}, { timestamps: true });

orderINproductSchema.index({ coordinate: "2dsphere" });
const OrderInProduct = mongoose.model("OrderInProduct", orderINproductSchema);
module.exports = OrderInProduct;