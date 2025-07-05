//Librerias importadas
import express from 'express';
import cors from 'cors'
import cookieParser from "cookie-parser";

//Rutas Importadas

import clientsRoutes from './src/routes/clients.js';
import registerRoutes from './src/routes/register.js';
import loginRoutes from './src/routes/login.js';
import logoutRoutes from './src/routes/logout.js';

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
app.use('/api/clients', clientsRoutes)
app.use('/api/register', registerRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/logout', logoutRoutes)

export default app;