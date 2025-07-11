//Librerias importadas
import express from 'express';
import cors from 'cors'
import cookieParser from "cookie-parser";


//Rutas Importadas
//Rutas de verificacion y recuperacion de usuarios
import registerRoutes from './src/routes/register.js';
import registerVetRoutes from './src/routes/registerVet.js'
import loginRoutes from './src/routes/login.js';
import logoutRoutes from './src/routes/logout.js';
import passwordRecovery from './src/routes/passwordRecovery.js';

//Importaciones de rutas de Cruds
import clientsRoutes from './src/routes/clients.js';
import holydaysRoutes from './src/routes/Holiday.js';
import productsRoutes from './src/routes/Products.js';
import employeesRoutes from './src/routes/employees.js';
import ReviewsRoutes from './src/routes/Reviews.js';


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
}

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions));

//Rutas
app.use('/api/clients', clientsRoutes)
app.use('/api/register', registerRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/logout', logoutRoutes)
app.use('/api/passwordRecovery', passwordRecovery)
app.use('/api/registerVet', registerVetRoutes)
app.use('/api/employees', employeesRoutes)
app.use('/api/holidays', holydaysRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/reviews', ReviewsRoutes)

export default app;