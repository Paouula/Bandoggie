import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const config = {
    db:{
        URI: process.env.DB_URI
    },
    server:{
        port: process.env.PORT
    },
    JWT: {
         secret: process.env.JWT_SECRET,
         expiresIn: process.env.JWT_EXPIRES
    },
    emailAdmin: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    },
    email: {
        email_user: process.env.EMAIL_USER,
        email_pass: process.env.EMAIL_PASS,
    },
    cloudinary: {
        cloudinary_name: process.env.CLOUDINARY_NAME,
        cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
        cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
    },
    apiKey: {
        api_key: process.env.API_KEY
    }
};

// ✅ GMAIL TRANSPORTER - Sistema directo sin Railway
export const gmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // bandoggiePetShop@gmail.com
        pass: process.env.EMAIL_PASS  // zudf aopz edkf zohi
    }
});

// Verificar conexión al iniciar
gmailTransporter.verify((error, success) => {
    if (error) {
        console.error('❌ Error configurando Gmail:', error.message);
    } else {
        console.log('✅ Gmail configurado correctamente');
        console.log(`📧 Email: ${process.env.EMAIL_USER}`);
    }
});