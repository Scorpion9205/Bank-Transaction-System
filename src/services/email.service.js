import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

// SMTP servers se interact karne ke liye hame transporter bnana padta hai 
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        type:'OAuth2',
        user:process.env.EMAIL_USER,
         clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Your Banking System" <${process.env.EMAIL_USER}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// registration Email
export const sendRegistrationEmail = async (userEmail, name) => {
    const subject = "Welcome to Your Banking System!";
    const text = `Hello ${name},

Thank you for registering at Your Banking System. We're excited to have you on board!

Best regards,
Your Banking System Team`;

    const html = `
        <p>Hello ${name},</p>
        <p>Thank you for registering at <strong>Your Banking System</strong>. We're excited to have you on board!</p>
        <p>Best regards,<br> Your Banking System Team</p>
    `;

    await sendEmail(userEmail, subject, text, html);
};

// Transaction Success Email
export const sendTransactionEmail = async (userEmail, name, amount, toAccount) => {
    const subject = "Transaction Successful!";
    const text = `Hello ${name},

Your transaction of $${amount} to account ${toAccount} was successful.

Best regards,
The Your Banking System Team`;

    const html = `
        <p>Hello ${name},</p>
        <p>Your transaction of <strong>$${amount}</strong> to account <strong>${toAccount}</strong> was successful.</p>
        <p>Best regards,<br>The Your Banking System Team</p>
    `;

    await sendEmail(userEmail, subject, text, html);
};

// Transaction Failure Email
export const sendTransactionFailureEmail = async (userEmail, name, amount, toAccount) => {
    const subject = "Transaction Failed";
    const text = `Hello ${name},

We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.

Best regards,
The Your Banking System Team`;

    const html = `
        <p>Hello ${name},</p>
        <p>We regret to inform you that your transaction of <strong>$${amount}</strong> to account <strong>${toAccount}</strong> has failed.</p>
        <p>Please try again later.</p>
        <p>Best regards,<br>The Your Banking System Team</p>
    `;

    await sendEmail(userEmail, subject, text, html);
};


// aise aur bhi template ham use kar sakte hai 
// login ke liye ya aur kisi bhi notification ke liye