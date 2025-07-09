import clientsModel from '../models/Clients.js';
import vetModel from '../models/Vets.js';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import { config } from '../config.js';
import { sendMail, HTMLRecoveryEmail } from '../utils/passwordRecovery.js';

const passwordRecovery = {};

passwordRecovery.requestCode = async (req, res) => {
  const { email } = req.body;
  try {
    let userFound;
    let userType;

    userFound = await clientsModel.findOne({ email });
    if (userFound) {
      userType = 'client';
    } else {
      userFound = await vetModel.findOne({ email });
      if (userFound) {
        userType = 'vet';
      }
    }

    if (!userFound) {
      return res.status(400).json({ message: 'No se ha encontrado ningún usuario' });
    }

    const code = crypto.randomBytes(3).toString('hex').toUpperCase();

    const token = jsonwebtoken.sign(
      { email, code, userType, verified: false },
      config.JWT.secret,
      { expiresIn: '30m' }
    );

    res.cookie('tokenRecoveryCode', token, {
      maxAge: 20 * 60 * 1000,
      httpOnly: true,
      sameSite: 'Lax',
    });

    await sendMail(
      email,
      'Password Recovery Code',
      `Este es tu código de verificación: ${code}`,
      HTMLRecoveryEmail(code)
    );

    return res.status(200).json({ message: 'Código de recuperación enviado con éxito' });
  } catch (error) {
    console.error('Error: ' + error);
    return res.status(500).json({ message: 'Error al enviar el correo', error });
  }
};

passwordRecovery.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;
    if (!token) {
      return res.status(401).json({ message: 'Token no encontrado' });
    }

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (decoded.code !== code) {
      return res.status(400).json({ message: 'El código es incorrecto' });
    }

    const newToken = jsonwebtoken.sign(
      {
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verified: true,
      },
      config.JWT.secret,
      { expiresIn: '20m' }
    );

    res.cookie('tokenRecoveryCode', newToken, {
      maxAge: 20 * 60 * 1000,
      httpOnly: true,
      sameSite: 'Lax',
    });

    return res.status(200).json({ message: 'Código verificado con éxito' });
  } catch (error) {
    console.error('Error: ' + error);
    return res.status(500).json({ message: 'Token inválido o expirado', error });
  }
};

passwordRecovery.newPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {

    const token = req.cookies.tokenRecoveryCode;
    if (!token) {
      return res.status(401).json({ message: 'Token no encontrado' });
    }


    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (!decoded.verified) {
      return res.status(403).json({ message: 'Código no verificado' });
    }

    const { email, userType } = decoded;

    let user;
    if (userType === 'client') {
      user = await clientsModel.findOne({ email });
    } else if (userType === 'vet') {
      user = await vetModel.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const hashPassword = await bcryptjs.hash(newPassword, 10);

    const isSamePassword = await bcryptjs.compare(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        message: "La nueva contraseña no puede ser igual a la anterior",
      });
    }
    else {
      if (userType === 'client') {
        await clientsModel.findByIdAndUpdate(user._id, { password: hashPassword }, { new: true });
      } else {
        await vetModel.findByIdAndUpdate(user._id, { password: hashPassword }, { new: true });
      }
    }

    res.clearCookie('tokenRecoveryCode');
    return res.status(200).json({ message: 'Contraseña actualizada con éxito' });
  } catch (error) {
    console.error('Error: ' + error);
    return res.status(500).json({ message: 'Error al actualizar la contraseña', error });
  }
};

export default passwordRecovery;
