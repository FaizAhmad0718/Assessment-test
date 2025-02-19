
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");

const sendEmail = async (to, name, phoneNumber) => {
    try {
        const subject = "Thank You for Creating Your Account!";
        const text = `Dear ${name},\n\nThank you for creating your account. Here are your details:\nName: ${name}\nEmail: ${to}\nPhone: ${phoneNumber}\n\nBest Regards,\nYour Company Team`;
        const html = `
            <p>Dear ${name},</p>
            <p>Thank you for creating your account. Here are your details:</p>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${to}</li>
                <li><strong>Phone:</strong> ${phoneNumber}</li>
            </ul>
            <p>Best Regards,</p>
            <p>Your Company Team</p>
        `;

        const msg = {
            to,
            from: `faizahmad0718@gmail.com`, // Make sure this is a verified sender
            subject,
            text,
            html,
        };

        await sgMail.send(msg);
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error.response ? error.response.body : error.message);
    }
};

// Example usage
sendEmail("user@example.com", "John Doe", "+1234567890");

module.exports = sendEmail;
