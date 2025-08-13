// Librerías importadas
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

// Rutas de verificación y recuperación de usuarios
import registerRoutes from './src/routes/registerClients.js';
import registerVetRoutes from './src/routes/registerVet.js';
import loginRoutes from './src/routes/login.js';
import checkVerificationRoutes from './src/routes/checkVerification.js';
import logoutRoutes from './src/routes/logout.js';
import passwordRecoveryRoutes from './src/routes/passwordRecovery.js';
import cartRoutes from './src/routes/Cart.js';

// Rutas de CRUDs
import holidayRoutes from './src/routes/holiday.js';
import clientsRoutes from './src/routes/clients.js';
import vetsRoutes from './src/routes/vets.js'
import adminRoutes from './src/routes/admin.js';
import productsRoutes from './src/routes/products.js';
import reviewsRoutes from './src/routes/reviews.js';
import employeesRoutes from "./src/routes/employees.js";
import categoriesRoutes from "./src/routes/categories.js";
import ordersRoutes from "./src/routes/orders.js";

// Rutas Invitados
import guestWholesalers from './src/routes/wholesalersPurchase.js';
import guestClients from './src/routes/retailsPurchase.js';

// Rutas Gráficas
//import salesRoutes from './src/routes/sales.js';

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
app.use('/auth/pending-verification', checkVerificationRoutes)

// Rutas de CRUDs y Graficas
app.use('/api/clients', clientsRoutes);
app.use('/api/vets', vetsRoutes)
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

// Rutas Gráficas
//app.use('/api/sales', salesRoutes);

// Carrito
app.use('/api/cart', cartRoutes);

export default app;
