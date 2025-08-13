import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js"; 

const checkVerification = {}


checkVerification.checkPendingVerification = async (req, res) => {
  const token = req.cookies.VerificationToken;

  if (!token) {
    return res.json({ pending: false });
  }

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    return res.json({
      pending: true,
      email: decoded.email, 
    });
  } catch (error) {
    return res.json({ pending: false });
  }
}

export default checkVerification;