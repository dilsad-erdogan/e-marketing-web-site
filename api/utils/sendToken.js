const jwt = require('jsonwebtoken');

const getJwtToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
};

const sendToken = (user, statusCode, res, message) => {
    const token = getJwtToken(user);

    res.status(statusCode).json({
        success: true,
        token,
        user: user,
        message: message
    });
};

module.exports = sendToken;