const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
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

orderSchema.index({ coordinates: "2dsphere" });
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;