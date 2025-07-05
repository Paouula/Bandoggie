import nodemailer from 'nodemailer'
import { config } from '../config.js'

const sendVerificationEmail = async (email, verificationCode) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email.email_user,
            pass: config.email.email_pass
        }
    })

    const mailOptions = {
        from: config.email.email_user,
        to: email,
        subject: "Verificación de correo - Bandoggie",
        html: `
            <div style="max-width: 480px; margin: 32px auto; background: #fffdfa; border-radius: 18px; box-shadow: 0 4px 24px rgba(0,0,0,0.10); border: 2px solid #ffb300; font-family: 'Baloo Bhaijaan 2', Arial, sans-serif; overflow: hidden;">
                <div style="background: linear-gradient(90deg, #ffb300 0%, #ff9800 100%); color: #222; text-align: center; padding: 24px 0 12px 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">
                    🐾 Bandoggie - Verifica tu correo
                </div>
                <div style="padding: 28px 32px 16px 32px; color: #333; font-size: 17px;">
                    <p style="margin-bottom: 18px;">¡Hola!</p>
                    <p style="margin-bottom: 18px;">Gracias por registrarte en <b>Bandoggie</b>. Para completar tu registro, ingresa el siguiente código de verificación:</p>
                    <div style="margin: 24px auto 24px auto; padding: 16px 0; background: #fff3cd; color: #ff9800; font-size: 32px; font-weight: bold; text-align: center; border-radius: 10px; border: 1.5px dashed #ffb300; width: 220px;">
                        ${verificationCode}
                    </div>
                    <p style="margin-bottom: 18px;">Este código expirará en <b>2 horas</b>.</p>
                    <a href="#" style="display: inline-block; margin: 18px 0 0 0; padding: 10px 28px; background: #ffb300; color: #fff; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; box-shadow: 0 2px 8px rgba(255,179,0,0.10); letter-spacing: 1px;">Ir a Bandoggie</a>
                    <p style="margin-top: 28px; color: #888; font-size: 14px;">Si no solicitaste este correo, puedes ignorarlo.</p>
                </div>
                <div style="background: #ffb300; text-align: center; padding: 10px; font-size: 15px; color: #fff; border-top: 1px solid #ffe082;">
                    🐶 Bandoggie - ¡Cuidamos a tus mejores amigos!
                </div>
            </div>
        `
    }
    

    return transporter.sendMail(mailOptions)
}

export default sendVerificationEmail
