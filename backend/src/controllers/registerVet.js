import vetModel from '../models/Vets.js';
import { config } from '../config.js';
import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import sendVerificationEmail from '../utils/verificationCode.js';

const registerVetController = {};

registerVetController.register = async (req, res) => {
    const { nameVet, email, password, locationVet, nitVet } = req.body;

    try {
        const existingVet = await vetModel.findOne({ email })
        if (existingVet) {
            return res.status(400).json({ message: "El correo ya está registrado." });
        }

        const passwordHash = await bcryptjs.hash(password, 10)

        const newVet = new vetModel({
            nameVet,
            email,
            password: passwordHash,
            locationVet,
            nitVet
        });
        await newVet.save()

        const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();

        const token = jsonwebtoken.sign(
            { email , verificationCode },
            config.JWT.secret,
            { expiresIn: '2h' }
        );

        res.cookie('VerificationToken', token, {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'lax',
        });

        await sendVerificationEmail(email, verificationCode)

        res.status(201).json({ message: "Cliente registrado exitosamente, verifica tu correo electrónico para completar el registro." });

    }
    catch (error){
        console.log('Error: ' + error);
        res.status(500).json({ message: "Error en el registro", error });
    }
}

registerVetController.verifyEmail = async (req, res) => {
    const { verificationCode } = req.body;
    const token = req.cookies.VerificationToken;

    if (!token) {
        return res.status(401).json({ message: "Token no encontrado" });
    }

    try {
        const decode = jsonwebtoken.verify(token, config.JWT.secret);
        if (decode.verificationCode !== verificationCode) {
            return res.status(400).json({ message: "Código de verificación incorrecto" });
        }
        res.clearCookie('VerificationToken');
        res.status(200).json({ message: "Correo verificado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Token inválido o expirado", error });
    }
};

export default registerVetController;