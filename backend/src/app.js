import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import authRoutes from './v1/routes/authRoutes.js';
import { verifyToken } from './utils/handleJwt.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running in port: ${process.env.SERVER_PORT}`);
});