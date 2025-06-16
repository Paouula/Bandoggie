//Librerias importadas
import express from 'express';
import cors from 'cors'
import cookieParser from "cookie-parser";

//Rutas Importadas

import clientsRoutes from './src/routes/clients.js';

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
}

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions));
app.use('/api/clients', clientsRoutes )


export default app;