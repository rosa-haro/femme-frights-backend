const nodemailer = require("nodemailer")

const emailConfig = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "femmefrightsproject@gmail.com",
        pass: "sjqo uhgu namm tcss"
    }
})

// Send welcome email
const sendEmail = async (to) => {
    try {
        const mailOptions = {
            from: "femmefrightsproject@gmail.com",
            to: to,
            subject: "Welcome to FemmeFrights",
            html: "Welcome to FemmeFrights! Thank you for joining us."
        }
        await emailConfig.sendMail(mailOptions);
    } catch (error) {
        console.log("Email could not be sended", error.message)
    }
}

module.exports = sendEmail