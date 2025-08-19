// controllers/loginController.js
import clientsModel from "../models/Clients.js";
import Employees from "../models/Employees.js";
import VetModel from "../models/Vets.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
import validator from "validator";

const loginController = {};
const MAX_ATTEMPTS = 3, LOCK_TIME = 15 * 60 * 1000;

const toISODate = (v) => (v ? new Date(v).toISOString().split("T")[0] : "");

const models = {
  employee: Employees,
  vet: VetModel,
  client: clientsModel,
};

const buildUserResponse = (user, type) => {
  const base = {
    _id: user._id,
    email: user.email,
    userType: type,
    image: user.image || "",
    phone: user.phone || "",
    address: user.address || "",
  };
  switch (type) {
    case "client":
      return {
        ...base,
        name: user.name || "",
        birthday: toISODate(user.dateOfBirth || user.birthday),
      };
    case "vet":
      return {
        ...base,
        name: user.nameVet || user.name || "",
        locationVet: user.locationVet || "",
        nitVet: user.nitVet || "",
      };
    case "employee":
      return { ...base, name: user.name || "" };
    default:
      return base;
  }
};

// -------------------------- LOGIN --------------------------
loginController.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !validator.isEmail(email))
    return res.status(400).json({ message: "Correo electrónico inválido o faltante" });
  if (!password || password.length < 8)
    return res.status(400).json({ message: "La contraseña es obligatoria y debe tener al menos 8 caracteres" });

  try {
    let userFound, userType;
    for (const [type, model] of Object.entries(models)) {
      userFound = await model.findOne({ email });
      if (userFound) { userType = type; break; }
    }
    if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" });

    // Bloqueo activo
    if (userFound.lockUntil && userFound.lockUntil.getTime() > Date.now()) {
      const m = Math.ceil((userFound.lockUntil.getTime() - Date.now()) / 60000);
      return res.status(403).json({ message: `Cuenta bloqueada. Intenta en ${m} min.` });
    }

    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) {
      userFound.loginAttempts = (userFound.loginAttempts || 0) + 1;

      if (userFound.loginAttempts >= MAX_ATTEMPTS) {
        userFound.lockUntil = new Date(Date.now() + LOCK_TIME);
        await userFound.save();
        return res.status(403).json({ message: `Cuenta bloqueada por ${LOCK_TIME / 60000} min.` });
      }

      await userFound.save();
      const restantes = MAX_ATTEMPTS - userFound.loginAttempts;
      return res.status(401).json({
        message: restantes === 1
          ? "Contraseña incorrecta. Te queda 1 intento antes de que tu cuenta sea bloqueada"
          : `Contraseña incorrecta. Intentos restantes: ${restantes}`,
      });
    }

    // Login exitoso -> resetear intentos
    userFound.loginAttempts = 0;
    userFound.lockUntil = undefined;
    await userFound.save();

    const token = jsonwebtoken.sign(
      { user: String(userFound._id), userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn }
    );

    res.cookie("authToken", token, { httpOnly: true, sameSite: "lax", secure: false });
    return res.status(200).json({
      message: "Login exitoso",
      userType,
      user: buildUserResponse(userFound, userType),
    });
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// -------------------------- GET AUTH USER --------------------------
loginController.getAuthenticatedUser = async (req, res) => {
  const token = req.cookies?.authToken;
  if (!token) return res.status(401).json({ message: "No autenticado" });

  try {
    const { user: id, userType } = jsonwebtoken.verify(token, config.JWT.secret);
    const user = await models[userType]?.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.status(200).json({ user: buildUserResponse(user, userType) });
  } catch (err) {
    console.error("Error en getAuthenticatedUser:", err);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// -------------------------- UPDATE PROFILE --------------------------
loginController.updateProfile = async (req, res) => {
  const token = req.cookies?.authToken;
  if (!token) return res.status(401).json({ message: "No autenticado" });

  try {
    const { user: id, userType } = jsonwebtoken.verify(token, config.JWT.secret);
    const { name, email, phone, address, birthday, dateOfBirth, locationVet, nitVet } = req.body;

    const updateData = { email, phone, address };
    if (userType === "client") updateData.dateOfBirth = birthday || dateOfBirth, updateData.name = name;
    if (userType === "vet") Object.assign(updateData, { nameVet: name, name, locationVet, nitVet });
    if (userType === "employee") updateData.name = name;

    Object.keys(updateData).forEach(k => !updateData[k] && delete updateData[k]);
    if (updateData.email && !validator.isEmail(updateData.email))
      return res.status(400).json({ message: "Correo electrónico inválido" });

    const user = await models[userType].findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select("-password");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    return res.status(200).json({
      message: "Perfil actualizado correctamente",
      user: buildUserResponse(user, userType),
    });
  } catch (err) {
    console.error("Error en updateProfile:", err);
    if (err.name === "ValidationError") return res.status(400).json({ message: "Error de validación", details: err.message });
    if (err.code === 11000) return res.status(400).json({ message: "El email ya está en uso" });
    return res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};

// -------------------------- LOGOUT --------------------------
loginController.logout = (req, res) => {
  try {
    res.clearCookie("authToken", { httpOnly: true, sameSite: "lax", secure: false });
    return res.status(200).json({ message: "Logout exitoso" });
  } catch (err) {
    console.error("Error en logout:", err);
    return res.status(500).json({ message: "Error al cerrar sesión" });
  }
};

export default loginController;
