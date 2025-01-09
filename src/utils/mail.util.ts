import {createTransport} from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS
    }
});

export async function sendPasswordResetToken(
    toEmail: string,
    verificationToken: string
) {
    await transporter.sendMail({
        from: `"FundoNotes" <${process.env.SMTP_MAIL}>`,
        to: toEmail,
        subject: 'Reset your password',
        html: `<p><strong>Token: ${verificationToken}</strong></p>`
    });
}

