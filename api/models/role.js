const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
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

roleSchema.index({ coordinates: "2dspehere" });
const Role = mongoose.model("Role", roleSchema);
module.exports = Role;