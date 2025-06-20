import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendContactEmail = async (req: any, res: any) => {
    try {
        const { name, email, subject, message } = req.body;

        const mailOptions = {
            from: email,
            to: process.env.RECIPIENT_EMAIL,
            subject: `Contacto: ${subject}`,
            html: `
                <h3>Nuevo mensaje de contacto</h3>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Asunto:</strong> ${subject}</p>
                <p><strong>Mensaje:</strong> ${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email enviado correctamente' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al enviar email' });
    }
};
