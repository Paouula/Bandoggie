// Librerías importadas
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

// Rutas de verificación y recuperación de usuarios
import registerRoutes from './src/routes/registerClients.js';
import registerVetRoutes from './src/routes/registerVet.js';
import loginRoutes from './src/routes/login.js';
import checkVerificationRoutes from './src/routes/checkVerification.js';
import logoutRoutes from './src/routes/logout.js';
import passwordRecoveryRoutes from './src/routes/passwordRecovery.js';
import cartRoutes from './src/routes/carts.js';
import resendVerifyCode from './src/routes/resendVerifyCode.js'
import emailRoutes from './src/routes/email.js';

// Rutas de CRUDs
import holidayRoutes from './src/routes/holidays.js';
import clientsRoutes from './src/routes/clients.js';
import vetsRoutes from './src/routes/vets.js'
import adminRoutes from './src/routes/admin.js';
import productsRoutes from './src/routes/product.js';
import reviewsRoutes from './src/routes/review.js';
import employeesRoutes from "./src/routes/employees.js";
import categoriesRoutes from "./src/routes/categories.js";
import ordersRoutes from "./src/routes/orders.js";

// Rutas Invitados
import guestWholesalers from './src/routes/wholesalersPurchase.js';
import guestClients from './src/routes/retailsPurchase.js';

//Rutas de gestión de pedidos
import internalOrderRoutes from './src/routes/orderManagementRoutes.js';

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Rutas de verificación y recuperación de usuarios
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/logout', logoutRoutes);
app.use('/api/passwordRecovery', passwordRecoveryRoutes);
app.use('/api/registerVet', registerVetRoutes);
app.use('/api/auth/pending-verification', checkVerificationRoutes);
app.use('/api/resend-code', resendVerifyCode);
app.use('/api/email', emailRoutes);

// Rutas de CRUDs y Gráficas
app.use('/api/clients', clientsRoutes);
app.use('/api/vets', vetsRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/holiday', holidayRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/categories', categoriesRoutes);

// Rutas Invitados
app.use('/api/guestWholesalers', guestWholesalers);
app.use('/api/guestClients', guestClients);

// Carrito
app.use('/api/cart', cartRoutes);

// 🆕 Ruta para gestión de órdenes internas
app.use('/api/internal-orders', internalOrderRoutes);

// Documentación Swagger
const swaggerDocument = JSON.parse(
    fs.readFileSync(path.resolve("./ricaldone-81c-Bandoggie-1.0.0-resolved.json"), "utf8")
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
