const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
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

basketSchema.index({ coordinates: "2dsphere" });
const Basket = mongoose.model('Basket', basketSchema);
module.exports = Basket;