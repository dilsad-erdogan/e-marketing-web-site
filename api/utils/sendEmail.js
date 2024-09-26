const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    console.log('Sending email with options:', options);

    var transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
    });

    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
    };

    await transporter.sendMail(message);
};

module.exports = sendEmail;