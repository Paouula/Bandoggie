// controllers/loginController.js
import clientsModel from "../models/client.js";
import Employees from "../models/Employees.js";
import VetModel from "../models/Vets.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
import validator from "validator";

const loginController = {};
const MAX_ATTEMPTS = 3, LOCK_TIME = 15 * 60 * 1000; // Max intentos antes de bloquear y tiempo de bloqueo (15 min)

const toISODate = (v) => (v ? new Date(v).toISOString().split("T")[0] : "");

// Mapeo de los distintos tipos de usuarios para buscarlos en la bd
const models = {
  employee: Employees,
  vet: VetModel,
  client: clientsModel,
};

// Armamos la respuesta del usuario dependiendo de su tipo
const buildUserResponse = (user, type) => {
  const base = {
    _id: user._id,
    email: user.email,
    userType: type,
    image: user.image || "",
    phone: user.phone || user.phoneEmployees || "",
    address: user.address || user.addressEmployees || "",
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
      return {
        ...base,
        name: user.nameEmployees || user.name || "",
        phoneEmployees: user.phoneEmployees || "",
        dateOfBirth: toISODate(user.dateOfBirth),
        addressEmployees: user.addressEmployees || "",
        hireDateEmployee: toISODate(user.hireDateEmployee),
        duiEmployees: user.duiEmployees || "",
      };
    default:
      return base;
  }
};

// -------------------------- LOGIN --------------------------
loginController.login = async (req, res) => {
  const { email, password, emailVerified } = req.body;

  // Validaciones basicas de email y password (acá evitamos basura en la entrada)
  if (!email || !validator.isEmail(email))
    return res.status(400).json({ message: "Correo electrónico inválido o faltante" });
  if (!password || password.length < 8)
    return res.status(400).json({ message: "La contraseña es obligatoria y debe tener al menos 8 caracteres" });
  if (emailVerified === false)
    return res.status(400).json({ message: "Por favor, verifica tu correo electrónico antes de iniciar sesión" });

  try {
    let userFound, userType;
    // Buscamos al usuario en cada colección (empleados, vets y clientes)
    for (const [type, model] of Object.entries(models)) {
      userFound = await model.findOne({ email });
      if (userFound) { userType = type; break; }
    }
    if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" });

    // Si el usuario está bloqueado todavía no puede entrar
    if (userFound.lockUntil && userFound.lockUntil.getTime() > Date.now()) {
      const m = Math.ceil((userFound.lockUntil.getTime() - Date.now()) / 60000);
      return res.status(403).json({ message: `Cuenta bloqueada. Intenta en ${m} min.` });
    }

    // Comparamos contraseña con bcrypt
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) {
      // Aumentamos los intentos fallidos
      userFound.loginAttempts = (userFound.loginAttempts || 0) + 1;

      // Si ya pasó el límite, se bloquea la cuenta
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

    // Si la contraseña está bien -> reseteamos intentos y quitamos bloqueo
    userFound.loginAttempts = 0;
    userFound.lockUntil = undefined;
    await userFound.save();

    // Generamos el token JWT para mantener la sesión
    const token = jsonwebtoken.sign(
      { user: String(userFound._id), userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn }
    );

    // Guardamos token en una cookie httpOnly (no se puede leer desde JS del navegador)
    res.cookie("authToken", token, {
      httpOnly: true, sameSite: "lax", secure: true, sameSite: "none",
    });
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
// Checamos el token de la cookie y devolvemos los datos del usuario logueado
// (si no existe el token o está expirado, se rechaza)
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



// -------------------------- LOGOUT --------------------------
// Simple: limpiamos la cookie y listo, el user queda deslogueado
// (esto es super util cuando quieres cerrar sesion desde el front)
loginController.logout = (req, res) => {
  try {
    res.clearCookie("authToken", { httpOnly: true, sameSite: "none", secure: true });
    return res.status(200).json({ message: "Logout exitoso" });
  } catch (err) {
    console.error("Error en logout:", err);
    return res.status(500).json({ message: "Error al cerrar sesión" });
  }
};


// -------------------------- UPDATE PROFILE --------------------------
// Permite actualizar datos del perfil del usuario autenticado
// Nota: acá solo dejamos cambiar lo basico (nombre, correo, etc) para evitar lios de seguridad

// -------------------------- UPDATE PROFILE --------------------------
// Permite actualizar datos del perfil del usuario autenticado
// Ahora incluye todas las validaciones de los controladores individuales

loginController.updateProfile = async (req, res) => {
  const token = req.cookies?.authToken;
  if (!token) return res.status(401).json({ message: "No autenticado" });

  try {
    const { user: id, userType } = jsonwebtoken.verify(token, config.JWT.secret);

    const {
      name,
      nameEmployees,
      nameVet,
      email,
      phone,
      address,
      password,
      birthday,
      dateOfBirth,
      locationVet,
      nitVet,
      duiEmployees,
      phoneEmployees,
      addressEmployees,
      hireDateEmployee
    } = req.body;

    // ========== VALIDACIONES COMUNES ==========

    // Validación de email si se proporciona
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Correo inválido" });
      }

      // Verificar que el email no esté en uso por otro usuario
      const existingUser = await models[userType].findOne({ email });
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(400).json({ message: "El email ya está en uso" });
      }
    }

    // Validación de contraseña si se proporciona
    if (password) {
      if (password.length < 8 || password.length > 30) {
        return res.status(400).json({ message: "La contraseña debe tener entre 8 y 30 caracteres" });
      }
    }

    // ========== VALIDACIONES Y ACTUALIZACIONES POR TIPO DE USUARIO ==========

    const updateData = {};

    // ---------- CLIENTE ----------
    if (userType === "client") {
      // Validar nombre si se proporciona
      if (name) {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,40}$/.test(name)) {
          return res.status(400).json({ message: "Nombre inválido (solo letras y espacios, 2-40 caracteres)" });
        }
        updateData.name = name;
      }

      if (email) updateData.email = email;

      // Validar teléfono si se proporciona
      if (phone) {
        if (!/^\d{4}-\d{4}$/.test(phone)) {
          return res.status(400).json({ message: "Teléfono inválido (formato 1111-1111)" });
        }
        updateData.phone = phone;
      }

      // Validar fecha de nacimiento
      if (birthday || dateOfBirth) {
        const birthDate = birthday || dateOfBirth;
        if (!validator.isDate(birthDate)) {
          return res.status(400).json({ message: "Fecha de nacimiento inválida" });
        }
        updateData.dateOfBirth = birthDate;
      }

      // Contraseña hasheada si se proporciona
      if (password) {
        updateData.password = await bcryptjs.hash(password, 10);
      }

      // Manejar imagen si se subió
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "public",
          allowed_formats: ["jpg", "png", "jpeg"],
        });
        updateData.image = result.secure_url;
      }
    }

    // ---------- VETERINARIO ----------
    if (userType === "vet") {
      // Validar nombre si se proporciona
      if (name) {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,40}$/.test(name)) {
          return res.status(400).json({ message: "Nombre inválido (solo letras y espacios, 2-40 caracteres)" });
        }
        updateData.nameVet = name;
      }

      if (email) updateData.email = email;

      // Validar ubicación
      if (locationVet) {
        if (!locationVet.trim()) {
          return res.status(400).json({ message: "Ubicación es obligatoria" });
        }
        updateData.locationVet = locationVet;
      }

      // Validar NIT
      if (nitVet) {
        if (!/^\d{4}-\d{6}-\d{3}-\d{1}$/.test(nitVet)) {
          return res.status(400).json({ message: "NIT inválido (formato 1234-567890-123-4)" });
        }
        updateData.nitVet = nitVet;
      }

      // Contraseña hasheada si se proporciona
      if (password) {
        updateData.password = await bcryptjs.hash(password, 10);
      }

      // Manejar imagen si se subió
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "vets",
          allowed_formats: ["jpg", "png", "jpeg"],
        });
        updateData.image = result.secure_url;
      }
    }

    // ---------- EMPLEADO ----------
    if (userType === "employee") {
      // Validar nombre si se proporciona
      if (name) {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,40}$/.test(name)) {
          return res.status(400).json({ message: "Nombre inválido (solo letras y espacios, 2-40 caracteres)" });
        }
        updateData.nameEmployees = name;
      }

      if (email) updateData.email = email;

      // Validar teléfono de empleado
      if (phoneEmployees) {
        if (!/^\d{4}-\d{4}$/.test(phoneEmployees)) {
          return res.status(400).json({ message: "Teléfono inválido (formato 1111-1111)" });
        }
        updateData.phoneEmployees = phoneEmployees;
      }

      // Validar fecha de nacimiento y edad
      if (dateOfBirth) {
        if (!validator.isDate(dateOfBirth)) {
          return res.status(400).json({ message: "Fecha de nacimiento inválida" });
        }
        const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
        if (age < 18) {
          return res.status(400).json({ message: "El empleado debe ser mayor de edad" });
        }
        updateData.dateOfBirth = dateOfBirth;
      }

      // Validar dirección
      if (addressEmployees) {
        if (addressEmployees.trim().length < 5) {
          return res.status(400).json({ message: "Dirección debe tener al menos 5 caracteres" });
        }
        updateData.addressEmployees = addressEmployees;
      }

      // Validar DUI
      if (duiEmployees) {
        if (!/^\d{8}-\d{1}$/.test(duiEmployees)) {
          return res.status(400).json({ message: "DUI inválido (formato 12345678-9)" });
        }
        updateData.duiEmployees = duiEmployees;
      }

      // Validar fecha de contratación
      if (hireDateEmployee) {
        if (!validator.isDate(hireDateEmployee)) {
          return res.status(400).json({ message: "Fecha de contratación inválida" });
        }
        updateData.hireDateEmployee = hireDateEmployee;
      }

      // Contraseña hasheada si se proporciona
      if (password) {
        updateData.password = await bcryptjs.hash(password, 10);
      }
    }

    // Si no hay datos para actualizar
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No hay datos para actualizar" });
    }

    // Guardamos los cambios en la base de datos
    const user = await models[userType]
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .select("-password");

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    return res.status(200).json({
      message: "Perfil actualizado correctamente",
      user: buildUserResponse(user, userType),
    });

  } catch (error) {
    console.error("Error en updateProfile:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Error de validación", details: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "El email ya está en uso" });
    }
    return res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};

export default loginController;
