import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js"; 

const checkVerification = {}

checkVerification.checkPendingVerification = async (req, res) => {
  const token = req.cookies.VerificationToken;

  if (!token) {
    console.log("No hay token de verificacion pendiente");
    return res.json({ pending: false });
  }

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    console.log("Token válido, decoded:", decoded);
    return res.json({
      pending: true,
      email: decoded.email,
    });
  } catch (error) {
    console.log("Error al decodificar token:", error);
    return res.json({ pending: false });
  }
};


export default checkVerification;