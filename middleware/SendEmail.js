const { createTransport } = require("nodemailer");

const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,

    secure: false,
    auth: {
        user: 'ap166392@gmail.com',
        pass: 'dddw hbyt wkwn iqmw',
    },
});




const send_email = (to, subject, htmlContent) => {
    const mailOptions = {
        from: 'ap166392@gmail.com',
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