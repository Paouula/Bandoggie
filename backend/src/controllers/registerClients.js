 // Asegúrate de tener esto en tu app principal
import jsonwebtoken from 'jsonwebtoken';
import crypto from 'crypto';
import bcryptjs from 'bcryptjs';
import clientsModel from '../models/Clients.js';
import {config} from '../config.js';
import cloudinary from 'cloudinary';
import sendVerificationEmail from '../utils/verificationCode.js';

const registerController = {};

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});

registerController.register = async (req, res) => {
    const { name, email, phone, birthday, password } = req.body;
    let imgUrl = "";
    try {
        const existingClient = await clientsModel.findOne({ email });
        if (existingClient) {
            return res.status(400).json({ message: "El correo ya está registrado." });
        }

        const passwordHash = await bcryptjs.hash(password, 10);
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "public",
                allowed_formats: ["jpg", "png", "jpeg"],
            });
            imgUrl = result.secure_url;
        }
        const newClient = new clientsModel({
            name,
            email,
            phone,
            birthday,
            password: passwordHash,
            image: imgUrl,
        });
        await newClient.save();

        const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();

        const token = jsonwebtoken.sign(
            { email, verificationCode },
            config.JWT.secret,
            { expiresIn: '2h' }
        );

        // Asegúrate de que la cookie se envía correctamente
        res.cookie('VerificationToken', token, {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'lax', // o 'none' si usas https y frontend en otro dominio
            // secure: true, // solo en producción con https
        });

        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({ message: "Cliente registrado exitosamente, verifica tu correo electrónico para completar el registro." });

    } catch (error) {
        console.log('Error: ' + error);
        res.status(500).json({ message: "Error en el registro", error });
    }
};

registerController.verifyEmail = async (req, res) => {
    const { verificationCode } = req.body;
    const token = req.cookies.VerificationToken;

    if (!token) {
        return res.status(401).json({ message: "Token no encontrado" });
    }

    try {
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        if (decoded.verificationCode !== verificationCode) {
            return res.status(400).json({ message: "Código de verificación incorrecto" });
        }
        // Aquí puedes actualizar el estado del usuario a verificado si lo deseas
        res.clearCookie('VerificationToken');
        res.status(200).json({ message: "Correo verificado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Token inválido o expirado", error });
    }
};

export default registerController;