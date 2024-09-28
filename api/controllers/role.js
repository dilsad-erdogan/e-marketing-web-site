const Role = require('../models/role');

async function addRole(req, res) {
    try{
        const { name } = req.body;

        const role = new Role({
            name: name,
            date_time: Date.now(),
            is_active: true
        });

        const savedRole = await role.save();
        if(savedRole) {
            res.status(201).json({ success: true, data: savedRole });
        } else {
            res.status(400).json({ success: false, message: 'Role error!' });
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error });
    }
};

module.exports = {
    addRole
};