const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const sendToken = require('../utils/sendToken');

const generate2FACode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
});

const accountLockout = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if(user && user.loginAttempts >= 5 && user.lockUntil > Date.now()) {
        return res.status(403).json({ success: false, error: 'Your account is locked. Please try again later.' });
    }

    next();
};

const register = catchAsyncError(async (req, res) => {
    const { role, name, email, password } = req.body;

    if (!role || !name || !email || !password) {
        return res.status(400).json({ success: false, error: 'All fields are required!' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, error: 'This email is already taken. Try again please!' });
    }

    const user = await User.create({ role, name, email, password, is_active: true });
    sendToken(user, 201, res, 'Account created successfully!');
});

const loginOrigin = catchAsyncError(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Please enter the email and password fields.' });
    }

    try{
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid email or password.' });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            user.loginAttempts += 1;
            if (user.loginAttempts >= 5) {
                user.lockUntil = Date.now() + 15 * 60 * 1000; // 15 dakika kilitle
                logger.warn(`Account locked due to multiple failed login attempts - Email: ${email}`);
            }
            await user.save();
            logger.warn(`Login attempt failed: Incorrect password - Email: ${email}`);
            return res.status(400).json({ success: false, error: 'Invalid email or password.' });
        }

        if(user.loginAttempts > 0) {
            user.loginAttempts = 0;
            user.lockUntil = undefined;
            await user.save();
        }

        sendToken(user, 201, res, { message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
});

const login2FA = catchAsyncError(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Please enter the email and password fields.' });
    }

    try{
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid email or password.' });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            user.loginAttempts += 1;
            if (user.loginAttempts >= 5) {
                user.lockUntil = Date.now() + 15 * 60 * 1000; // 15 dakika kilitle
                logger.warn(`Account locked due to multiple failed 2FA login attempts - Email: ${email}`);
            }
            await user.save();
            return res.status(400).json({ success: false, error: 'Invalid email or password.' });
        }

        // 2FA kodu oluştur ve kullanıcıya gönder
        const twoFACode = generate2FACode();
        user.twoFACode = twoFACode;
        user.twoFAExpire = Date.now() + 10 * 60 * 1000; // 10 dakika geçerli
        await user.save();

        const message = `Your 2FA code is:\n\n${twoFACode}\n\nIf you have not requested this code, please ignore it.`;
        await sendEmail({
            to: user.email,
            subject: 'Your 2FA Code',
            text: message,
        });

        res.status(200).json({ success: true, message: '2FA code sent to your email.' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
});

const verify2FA = catchAsyncError(async (req, res) => {
    const { email, twoFACode } = req.body;

    if (!email || !twoFACode) {
        return res.status(400).json({ success: false, error: 'Please enter the email and 2FA code fields.' });
    }

    try{
        const user = await User.findOne({ email });
        if (!user || user.twoFACode !== twoFACode || user.twoFAExpire < Date.now()) {
            return res.status(400).json({ success: false, error: 'Invalid or expired 2FA code.' });
        }

        user.twoFACode = undefined;
        user.twoFAExpire = undefined;
        await user.save();

        if(user.loginAttempts > 0) {
            user.loginAttempts = 0;
            user.lockUntil = undefined;
            await user.save();
        }

        sendToken(user, 200, res, { message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
});

const forgotPassword = catchAsyncError(async (req, res) => {
    const { id } = req.body;

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found with this email.' });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const message = `Your password reset token is:\n\n${resetUrl}\n\nIf you have not requested this email, please ignore it.`;

    try{
        await sendEmail({
            to: user.email,
            subject: 'Password Recovery',
            text: message,
        });

        res.status(200).json({ success: true, message: 'Email sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        res.status(500).json({ success: false, error: 'Email could not be sent' });
    }
});

module.exports = {
    register,
    loginOrigin: [loginLimiter, accountLockout, loginOrigin],
    login2FA,
    verify2FA: [loginLimiter, accountLockout, verify2FA],
    forgotPassword
};