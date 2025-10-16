const { createTransport } = require("nodemailer");

const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,

    secure: false,
    auth: {
        user: 'sales@franticpro.com',
        pass: 'zyhu slsi yoqt rggi',

    },
});




const send_email = (to, subject, htmlContent) => {
    const mailOptions = {
        from: 'sales@franticpro.com',
        to: to,
        subject: `${subject}`,
        html: `${htmlContent}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    send_email
}